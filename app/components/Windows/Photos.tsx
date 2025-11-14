import { Globe, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cssArt, graphicDesign } from "@/Constants/art";
import clsx from "clsx";

export default function Photos() {
    return (
        <div className="grid gap-2">
            
            <div
                className="h-[1px] bg-foreground/10 mx-2"
            />
            <div className="grid gap-2 p-2">
                <p>Beberapa Client Yang Di Sudah Kami Handle</p>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 mt-2">
                    {cssArt.map((art) => (
                        <div key={art.id}>
                            <div className="aspect-square rounded-xl overflow-hidden relative group active:scale-95 active:opacity-75 transition-all duration-300 border border-purple-500/20 hover:border-purple-500">
                                <Image
                                    src={art.src}
                                    alt={art.alt}
                                    width={250}
                                    height={250}
                                    draggable={false}
                                    priority
                                    onContextMenu={(e) => {
                                        e.preventDefault();  
                                    }}
                                    onContextMenuCapture={(e) => {
                                        e.preventDefault();
                                    }}
                                    placeholder="blur"
                                    blurDataURL={art.src}
                                    className="object-cover w-full h-full"
                                />
                                
                            </div>
                            <p className="my-2 text-sm">{art.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}