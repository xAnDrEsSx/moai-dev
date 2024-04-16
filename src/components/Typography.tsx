// Utils
import { joinClassNames } from "@utils/functions";

export function TextH1({ children, className = "" }: ITypography) {
    return (
        <h1 className={joinClassNames(className)}>
            {children}
        </h1>
    );
}

export function TextH2({ children, className = "" }: ITypography) {
    return (
        <h2 className={joinClassNames(className)}>
            {children}
        </h2>
    );
}

export function TextH3({ children, className = "" }: ITypography) {
    return (
        <h3 className={joinClassNames(className)}>
            {children}
        </h3>
    );
}

export function TextH4({ children, className = "" }: ITypography) {
    return (
        <h4 className={joinClassNames(className)}>
            {children}
        </h4>
    );
}

export function TextH5({ children, className = "" }: ITypography) {
    return (
        <h5 className={joinClassNames(className)}>
            {children}
        </h5>
    );
}

export function TextH6({ children, className = "" }: ITypography) {
    return (
        <h6 className={joinClassNames(className)}>
            {children}
        </h6>
    );
}

export function TextP({ children, className = "" }: ITypography) {
    return (
        <p className={joinClassNames(className)}>
            {children}
        </p>
    );
}

export function TextSpan({ children, className = "" }: ITypography) {
    return (
        <span className={joinClassNames(className)}>
            {children}
        </span>
    );
}