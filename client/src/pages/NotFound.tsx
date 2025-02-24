// Import the AlertTriangle icon from lucide-react
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="w-full h-[calc(100dvh-60px)] bg-gray-800 text-white flex flex-col justify-center items-center text-2xl font-bold">
            {/* Render the AlertTriangle icon */}
            <AlertTriangle size={100} color="white" className="mb-4" />
            404 - Page Not Found
        </div>
    );
}
