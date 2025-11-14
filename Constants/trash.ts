export interface Trash {
    id: string;
    name: string;
    icon: string;
    downloadable: boolean;
    downloadURL?: string;
}

export const trash: Trash[] = [
    {
        id: "trash-1",
        name: "CV Rizky Reynaldi",
        icon: "/images/icons/pdf.png",
        downloadable: true,
        downloadURL: "/images/assets/cv.pdf"
    }
]