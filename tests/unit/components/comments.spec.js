import { shallowMount } from "@vue/test-utils";
import Comments from "@/components/Comments";

import { commentsMock } from "../../mock/comments";
import { bookMock } from "../../mock/book";

import commentService from "@/services/commentService";

describe("functions", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Comments, {
      propsData: { book: bookMock },
    });

    wrapper.vm.commentsBook = commentsMock;
  });

  it("should be loaded", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("should contain all comments", () => {
    const commentsFound = wrapper.findAll("[data-test-id='comment']").length;
    expect(commentsFound).toBe(2);
  });

  it("should contain comments title", () => {
    expect(wrapper.find("[data-test-id='title-comment']").text()).toBe(
      commentsMock[0].title
    );
  });

  it("should have a disabled button", () => {
    expect(wrapper.vm.disabled).toBeTruthy();
  });

  it("should have an enabled button", () => {
    wrapper.vm.title = "test";
    wrapper.vm.content = "test";
    expect(wrapper.vm.disabled).toBeFalsy();
  });

  it("should add a comment", async () => {
    const comment = {
      bookID: bookMock.id,
      title: "Hello",
      content: "world",
    };

    wrapper.vm.title = comment.title;
    wrapper.vm.content = comment.content;

    const mockAddComment = jest.fn();
    commentService.addComment = mockAddComment;

    await wrapper.vm.addCommentAction();

    expect(wrapper.findAll("[data-test-id='comment']").length).toBe(3);
    expect(
      wrapper
        .findAll("[data-test-id='title-comment']")
        .at(2)
        .text()
    ).toBe(comment.title);

    expect(wrapper.vm.title).toBe("");
    expect(wrapper.vm.content).toBe("");

    expect(mockAddComment).toHaveBeenCalled();
  });
});
