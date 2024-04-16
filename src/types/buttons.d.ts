interface IButton {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
    type?: "button" | "submit" | "reset";
    style?:
    | "primary"
    | "secondary"
    | "primaryBordered"
    | "light"
    | "dark"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "default"
    | "danger"
    | "dangerGhost"
    | "primaryGhost"
    | "secondaryGhost"
    | "link"
    | "successGhost"
    | "warningGhost"
    | "errorGhost"
    | "infoGhost"
    | "defaultGhost";
}
