import Profiles from "@/pages/profiles";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { fireEvent, screen } from "@testing-library/react";
import usersService from "../../src/services/Users";
import { User } from "@/models/User";
import { RequestStatus } from "@/models/RequestStatus";

jest.mock("../../src/services/Users");

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

const users: User[] = [
  {
    email: "theresia1987@hotmail.com",
    friends: [],
    fullName: "Theresa James",
    id: "1",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "theresa001",
  },
  {
    email: "willa_jas9@gmail.com",
    friends: [],
    fullName: "William Sean",
    id: "2",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "sean001",
  },
  {
    email: "trever_treut@yahoo.com",
    friends: [],
    fullName: "Raquel E Craig",
    id: "3",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "rocia001",
  },
  {
    email: "theresia1987@hotmail.com",
    friends: [],
    fullName: "Timothy J Schneider",
    id: "4",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "",
  },
  {
    email: "theresia1987@hotmail.com",
    friends: [],
    fullName: "Leonard J Dykes",
    id: "5",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "",
  },
  {
    email: "theresia1987@hotmail.com",
    friends: [],
    fullName: "Giuseppe M Colella",
    id: "6",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "",
  },
  {
    email: "theresia1987@hotmail.com",
    friends: [],
    fullName: "Diane M Ramirez",
    id: "7",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "",
  },
  {
    email: "theresia1987@hotmail.com",
    friends: [],
    fullName: "Matt J Moreno",
    id: "8",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "",
  },
  {
    email: "theresia1987@hotmail.com",
    friends: [],
    fullName: "Kim M Wilcox",
    id: "9",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "",
  },
  {
    email: "theresia1987@hotmail.com",
    friends: [],
    fullName: "Marla D Shugart",
    id: "10",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "",
  },
  {
    email: "theresia1987@hotmail.com",
    friends: [],
    fullName: "",
    id: "11",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "",
  },
];

describe("profiles page", () => {
  it("should map users", async () => {
    // @ts-expect-error
    usersService.getAll.mockImplementation(() => Promise.resolve(users));

    renderWithRedux(<Profiles />, {
      auth: { isAuthed: true, status: RequestStatus.IDLE },
    });

    const loader = screen.getByTestId("loader");

    const userSummaries = await screen.findAllByTestId("user-summary");
    expect(userSummaries.length).toBe(10);
  });

  it("should display error", async () => {
    // @ts-expect-error
    usersService.getAll.mockImplementation(() => Promise.reject(""));

    renderWithRedux(<Profiles />, {
      auth: { isAuthed: true, status: RequestStatus.IDLE },
    });

    const errorText = await screen.findByTestId("error-txt");
    expect(errorText).toBeInTheDocument();
  });

  it("should show users by search", async () => {
    // @ts-expect-error
    usersService.getAll.mockImplementation(() => Promise.resolve(users));

    renderWithRedux(<Profiles />, {
      auth: { isAuthed: true, status: RequestStatus.IDLE },
    });

    const search = screen.getByLabelText("Search by username");
    fireEvent.input(search, { target: { value: "001" } });

    const userSummaries = await screen.findAllByTestId("user-summary");
    expect(userSummaries.length).toBe(3);
  });
});
