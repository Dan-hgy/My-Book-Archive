import { Footer, TextInput } from "flowbite-react";
import CreateBook from "../components/create-new-book";
import { LayoutProps } from "../models";

interface SearchProps {
    onSearch: (text: string) => void;
}

const Layout = ({ children, onRefresh, onSearch }: LayoutProps & SearchProps) => {
    return (

        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">

            <header className="sticky top-0 z-20 flex flex-wrap justify-between items-center gap-4 p-4 text-white w-full bg-gray-800 shadow-md">
                <span className="text-xl font-bold hidden sm:block">My Library</span>

                <div className="flex-grow max-w-md">
                    <TextInput
                        placeholder="Search books..."
                        onChange={(e) => onSearch(e.target.value)}
                        sizing="sm"
                    />
                </div>

                <CreateBook onRefresh={onRefresh} />
            </header>

            <main className="flex-grow w-full">
                {children}
            </main>

            <footer className="w-full mt-auto">
                <Footer container className="bg-gray-800 rounded-none shadow-none text-white">
                    <div className="w-full text-center">
                        © 2026 My Library App
                    </div>
                </Footer>
            </footer>
        </div>
    );
};

export default Layout;