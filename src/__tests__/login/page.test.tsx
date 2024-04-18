// NextJS
import { NextIntlClientProvider } from "next-intl";

// Pages
import LoginPage from "@pages/[locale]/login/page";

// ReactJS
import { render, screen } from "@testing-library/react";

// Components
import Provider from "@components/Provider";

// Mocks
import messages from "@mocks/messages.json";

it("Renders Login Page", () => {    
    render(
        <NextIntlClientProvider locale="es" messages={messages}>
            <Provider>
                <LoginPage />
            </Provider>
        </NextIntlClientProvider>
    );
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
});
