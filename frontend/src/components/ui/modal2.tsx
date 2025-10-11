import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "./button";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    onConfirm: () => void
    setModal: (value: boolean) => void
    open: boolean
    title: string
    description: string
    toastDescription: string
    button1: string
    button2: string
}

export const Modal2 = ({ onConfirm, setModal, open, title, description, button1, button2, toastDescription }: Props) => {


    return (
        <div>
            <Dialog open={open} onOpenChange={setModal}>
                <DialogContent className="bg-gray-900 border-gray-800 rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-white font-bold">{title}</DialogTitle>
                        <DialogDescription className="text-gray-300 mt-2">
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant={'outline'} className="cursor-pointer bg-transparent text-white border border-gray-500 rounded-2xl  hover:bg-blue-500 hover:border-transparent py-4.5" onClick={() => setModal(false)} >{button1}</Button>
                        <Button variant={'outline'} className="cursor-pointer bg-red-900 text-gray-900 rounded-2xl border-0 hover:bg-red-900/80 py-4.5" onClick={() => { onConfirm(); setModal(false) }}>{button2}</Button>
                        <Button variant={'outline'} className="cursor-pointer bg-red-900 text-gray-900 rounded-2xl border-0 hover:bg-red-900/80 py-4.5" onClick={() =>
                            toast.custom(() => (
                                <div className="bg-red-900 text-white  px-5 text-sm py-5 rounded-xl shadow-lg">
                                    <p className="font-bold mb-2">Removido da Estante</p>
                                    <p>"{toastDescription}" foi removido da sua estante.</p>
                                </div>
                            ))
                        }>teste</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}