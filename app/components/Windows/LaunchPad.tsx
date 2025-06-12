"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { launchpadApps } from "@/Constants/constants";
import useSoundEffect from "@useverse/usesoundeffect";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";

// Define the app type based on your constants
type LaunchpadApp = {
    id: string;
    src: string;
    alt: string;
    title: string;
    url: string;
};

// Create a sortable version of your app item component
const SortableAppItem = ({ app }: { app: LaunchpadApp }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: app.id,
        transition: {
            duration: 150,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative cursor-grab active:cursor-grabbing w-full h-full aspect-square group touch-none"
            title={`Drag to reorder | Click to visit ${app.title}`}
        >
            <Link 
                href={app.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative cursor-pointer w-full h-full aspect-square group block"
                onClick={(e) => {
                    // Prevent link navigation when dragging
                    if (isDragging) {
                        e.preventDefault();
                    }
                }}
            >
                <Image
                    src={app.src}
                    alt={app.alt}
                    height={100}
                    onContextMenu={(e) => {
                        e.preventDefault();  
                    }}
                    onContextMenuCapture={(e) => {
                        e.preventDefault();
                    }}
                    priority
                    placeholder="blur"
                    blurDataURL={app.src}
                    width={100}
                    draggable={false}
                    className="object-contain aspect-square h-full w-full group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-active:scale-95 transition-all duration-300 pointer-events-none"
                />
                <p className="text-center text-xs -mt-1 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none">{app.title}</p>
            </Link>
        </div>
    );
};

export default function LaunchPad() {
    // State to track the order of apps
    const [apps, setApps] = useState(
        launchpadApps.map((app) => ({ ...app, id: app.id }))
    );

    const swipeSound = useSoundEffect("/audio/swipe.mp3", {
        volume: 0.25,
    });

    // State to track the currently active (dragging) item
    const [activeId, setActiveId] = useState<string | null>(null);

    // Set up sensors for drag detection
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Distance threshold to distinguish between click and drag
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Handle drag start
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    // Handle the end of a drag event
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
            swipeSound.play();
            setApps((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    // Get the active app if there is one
    const activeApp = activeId
        ? apps.find(app => app.id === activeId)
        : null;

    // Custom drop animation configuration
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.3',
                },
            },
        }),
        duration: 200,
        easing: 'cubic-bezier(0.2, 1, 0.1, 1)',
    };

    return (
        <div className="p-3">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={apps.map((app) => app.id)}
                    strategy={rectSortingStrategy} // Perfect for grid layouts with 2D movement
                >
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2 gap-y-5">
                        {apps.map((app) => (
                            <SortableAppItem key={app.id} app={app} />
                        ))}
                    </div>
                </SortableContext>
                {typeof window !== 'undefined' && createPortal(
                    <DragOverlay dropAnimation={dropAnimation}>
                        {activeId && activeApp ? (
                            <div className="opacity-90 scale-110 rotate-2 shadow-xl">
                                <div className="relative w-full h-full aspect-square bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2">
                                    <Image
                                        src={activeApp.src}
                                        alt={activeApp.alt}
                                        height={100}
                                        width={100}
                                        draggable={false}
                                        className="object-contain aspect-square h-full w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    />
                                    <p className="text-center text-xs -mt-1 opacity-90 absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                        {activeApp.title}
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
}