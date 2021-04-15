import { shallowMount, createLocalVue } from "@vue/test-utils";

import { commentsMock } from "../../mock/comments";
import { bookMock } from "../../mock/book";

import Comments from "@/components/Comments";

import commentService from "@/services/commentService";

describe(">>>>>> Comments ", () => {
  let wrapper;

  //Pour faire marcher vuetify. Ne pas oublier de faire un fichier de config setup.js et de le lier dans le jest config
  const localVue = createLocalVue();

  //A chaque chargement des test l'appel à la fonction du service aura lieu. C'est de l'asynchrone et du coup ca perturbe les tests
  const mockGetComments = jest.fn();
  mockGetComments.mockReturnValue(commentsMock);
  commentService.getComments = mockGetComments;

  beforeEach(() => {
    wrapper = shallowMount(Comments, {
      localVue,
      propsData: { book: bookMock },
    });
    wrapper.vm.comments = commentsMock;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should be mounted", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("should display book title", () => {
    expect(wrapper.find("[data-test-id='title-book']").text()).toBe(
      bookMock.title
    );
  });

  it("should load comments", () => {
    expect(wrapper.find("[data-test-id='nb-comments']").text()).toContain(
      commentsMock.length
    );
  });

  it("should display comments", () => {
    expect(wrapper.find("[data-test-id='title-comments']").text()).toContain(
      commentsMock[0].title
    );
  });
  it("should have button enabled", () => {
    expect(wrapper.vm.isDisabled).toBeTruthy();
    wrapper.vm.titleComment = "Hello";
    wrapper.vm.contentComment = "world";
    expect(wrapper.vm.isDisabled).toBeFalsy();
  });

  it("should add a comment", async () => {
    const comment = {
      bookID: "135351",
      title: "Hello",
      content: "world",
    };

    const mockAddComment = jest.fn();
    commentService.addComment = mockAddComment;

    const nbCommentsMock = commentsMock.length; //?

    wrapper.vm.titleComment = comment.title;
    wrapper.vm.contentComment = comment.content;

    const button = wrapper.find("[data-test-id='add-button']");
    await button.vm.$emit("click");

    expect(wrapper.findAll("[data-test-id='comment']").length).toBe(
      nbCommentsMock + 1
    );

    expect(mockAddComment).toHaveBeenCalled();
  });
});
