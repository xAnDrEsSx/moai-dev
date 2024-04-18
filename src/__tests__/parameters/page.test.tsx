// NextJS
import { NextIntlClientProvider, useMessages } from "next-intl";

// Pages
import ParametersPage from "@pages/[locale]/parameters/page";

// ReactJS
import { render, screen } from "@testing-library/react";

// Components
import Provider from "@components/Provider";

// Mocks
import messages from "@mocks/messages.json";

it("Renders Parameters Page", () => {
    render(
        <NextIntlClientProvider locale="es" messages={messages}>
            <Provider>
                <ParametersPage />
            </Provider>
        </NextIntlClientProvider>
    );
    expect(screen.getByText("Parámetros")).toBeInTheDocument();
});