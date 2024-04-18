// NextJS
import { NextIntlClientProvider } from "next-intl";

// Pages
import ProfilePage from "@pages/[locale]/profile/page";

// ReactJS
import { render, screen } from "@testing-library/react";

// Components
import Provider from "@components/Provider";

// Mocks
import messages from "@mocks/messages.json";

it("Renders Profile Page", () => {
    render(
        <NextIntlClientProvider locale="es" messages={messages}>
            <Provider>
                <ProfilePage />
            </Provider>
        </NextIntlClientProvider>
    );
    expect(screen.getByText("Detalles del perfil")).toBeInTheDocument();
});