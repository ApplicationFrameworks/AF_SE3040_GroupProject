import { render } from "@testing-library/react";
import App from "./App";

test("header renders with react testing tutorial in the document", ()=>{
render(<App/>);
const linkElement = screen.getByText(/This is react/i);
expect(linkElement).toBeInTheDocument();
});