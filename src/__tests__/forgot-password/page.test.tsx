// NextJS
import { NextIntlClientProvider, useMessages } from "next-intl";

// Pages
import ForgotPassword from "@pages/[locale]/forgot-password/page";

// ReactJS
import { render, screen } from "@testing-library/react";

// Components
import Provider from "@components/Provider";

// Mocks
import messages from "@mocks/messages.json";

it("Renders Forgot Password Page", () => {
    render(
        <NextIntlClientProvider locale="es" messages={messages}>
            <Provider>
                <ForgotPassword />
            </Provider>
        </NextIntlClientProvider>
    );
    expect(screen.getByText("¿Olvidaste tu contraseña?")).toBeInTheDocument();
});