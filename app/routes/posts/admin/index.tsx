import { Link } from 'react-router-dom'

export default function AdminIndexRoute() {
    return (
        <p>
            <Link to="new" className="text-blue-600 underline">
                Create a New Post
            </Link>
        </p>
    )
}
