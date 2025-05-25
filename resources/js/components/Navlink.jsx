import { Link } from "@inertiajs/react";

export default function NavLink({ current, href, children }) {
    return (
        <Link
            href={href}
            className={`${ current === href ? "text-red-600 font-semibold" : "" }`}
        >
            {children}
        </Link>
    );
}