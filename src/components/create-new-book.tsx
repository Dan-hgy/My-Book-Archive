import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import { ApiService } from "../services/api-service";
import { CardRequestModel, LayoutProps } from "../models";
import { toast } from "react-toastify";

function CreateBook({ onRefresh }: LayoutProps) {

    const [formData, setFormData] = useState<CardRequestModel>({ title: "", author: "", coverImage: "" });

    async function handleCreate() {

        if (!formData.title || !formData.author) {
            toast.warning("Please fill in the Title and Author! ⚠️");
            return;
        }

        try {
            await ApiService.CreateCard(formData);

            toast.success("Book created successfully! 📚✨");

            onRefresh();
            onCloseModal();
        } catch (error) {
            console.error(error);
            toast.error("Failed to create book. Try again later. ❌");
        }
    }

    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <Button onClick={() => setOpenModal(true)} className="hover: cursor-pointer ">Create New Book</Button>

            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Books Card</h3>
                            <button onClick={() => setOpenModal(false)} className="text-white hover:cursor-pointer hover:text-red-600 transition-colors ">X</button>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="title">Book Title</Label>
                            </div>
                            <TextInput
                                id="title"
                                placeholder="Bag of Bones"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="author">Author</Label>
                            </div>
                            <TextInput
                                id="author"
                                placeholder="Stephen King"
                                required
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="image">Image URL</Label>
                            </div>
                            <TextInput
                                id="image"
                                required
                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            />
                        </div>
                        <div className="w-full">
                            <Button onClick={handleCreate} className="hover:cursor-pointer">Create Book</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal >
        </>
    )
}

export default CreateBook;