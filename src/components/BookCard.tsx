import { useState } from "react";
import { Card, Button, Modal, Label, TextInput, Textarea, ModalHeader, ModalBody } from "flowbite-react";
import { toast } from "react-toastify";
import { ApiService } from "../services/api-service";
import { CardResponseModel } from "../models";
import { LayoutProps } from "../models";


export function BookCard({ book, onRefresh }: { book: CardResponseModel } & LayoutProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: book.title,
        author: book.author,
        description: book.description,
        coverImage: book.coverImage,
        isFavorite: book.isFavorite,
    });

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
            return;
        }

        try {
            await ApiService.DeleteBook(book.id);
            toast.success("Book deleted successfully! 🗑️");
            onRefresh();
        } catch (error) {
            console.error("Error in handleDelete:", error);
            toast.error("Book delete failed ❌");
        }
    };

    const handleToggleFavorite = async () => {
        try {
            const payload = {
                ...editFormData,
                isFavorite: !book.isFavorite
            };

            await ApiService.UpdateBook(book.id, payload);
            setEditFormData(payload);

            if (book.isFavorite) {
                toast.info("Deleted from favorites 💔");
            } else {
                toast.success("Added to favorites ❤️");
            }

            onRefresh();
        } catch (error) {
            console.error("Error in handleToggleFavorite:", error);
            toast.error("Failed to update favorite status ❌");
        }
    };

    const handleSaveChanges = async () => {
        if (!editFormData.title || !editFormData.author) {
            toast.warning("Title and Author are required!");
            return;
        }

        try {
            await ApiService.UpdateBook(book.id, editFormData);
            toast.success("Book updated successfully! ✏️");
            setIsEditModalOpen(false);
            onRefresh();
        } catch (error) {
            console.error("Error in handleSaveChanges:", error);
            toast.error("Failed to update book ❌");
        }
    };

    const handleCancelEdit = () => {
        setEditFormData({
            title: book.title,
            author: book.author,
            description: book.description,
            coverImage: book.coverImage,
            isFavorite: book.isFavorite,
        });
        setIsEditModalOpen(false);
    };

    return (
        <>
            <Card
                className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300"
                imgAlt={book.title}
                imgSrc={book.coverImage || "https://picsum.photos/200/300"}
            >
                <div className="flex-grow">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                        {book.title}
                    </h5>
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                        Author: {book.author}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400 ">
                        {book.description}
                    </p>
                </div>

                <div className="flex justify-between items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Button
                        color={book.isFavorite ? "pink" : "blue"}
                        onClick={handleToggleFavorite}
                        className="flex-1 hover:cursor-pointer transition-transform active:scale-95"
                        size="sm"
                    >
                        {book.isFavorite ? "❤️ Liked" : "🤍 Like"}
                    </Button>

                    <Button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex-1 hover:cursor-pointer transition-transform active:scale-95"
                        size="sm"
                    >
                        Edit
                    </Button>

                    <Button
                        onClick={handleDelete}
                        className="flex-1 hover:cursor-pointer transition-transform active:scale-95"
                        size="sm"
                    >
                        Delete
                    </Button>
                </div>
            </Card>

            <Modal show={isEditModalOpen} onClose={handleCancelEdit} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Edit Book
                        </h3>

                        <div>
                            <Label htmlFor="edit-title">
                                Title
                            </Label>
                            <TextInput
                                id="edit-title"
                                value={editFormData.title}
                                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="edit-author">
                                Author
                            </Label>
                            <TextInput
                                id="edit-author"
                                value={editFormData.author}
                                onChange={(e) => setEditFormData({ ...editFormData, author: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="edit-cover">
                                Cover Image URL
                            </Label>
                            <TextInput
                                id="edit-cover"
                                value={editFormData.coverImage}
                                onChange={(e) => setEditFormData({ ...editFormData, coverImage: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="edit-desc" >
                                Description
                            </Label>
                            <Textarea
                                id="edit-desc"
                                rows={4}
                                value={editFormData.description}
                                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4 pt-2 border-t">
                            <Button color="gray" onClick={handleCancelEdit}>
                                Cancel
                            </Button>
                            <Button color="blue" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal >
        </>
    );
}

export default BookCard;