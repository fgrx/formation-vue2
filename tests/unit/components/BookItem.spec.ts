import { mount, createLocalVue } from "@vue/test-utils";
import { bookMock } from "../../mock/book";
import Vuetify from "vuetify";

import BookItem from "@/components/BookItem.vue";

import Vuex from "vuex";
import basket from "@/store/modules/basket";

let wrapper;
let store;

describe("BookItem >>>>>", () => {
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        basket,
      },
    });
    const vuetify = new Vuetify();
    wrapper = mount(BookItem, {
      propsData: { book: bookMock },
      store,
      localVue,
      vuetify,
      stubs: ["router-link"],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should be mounted", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("should contain a title", () => {
    expect(wrapper.find("[data-test-id='title-book']").text()).toContain(
      bookMock.title
    );
  });

  it("should add to store when buy button is clicked", async () => {
    const buyButton = wrapper.find("[data-test-id='buyButton']");
    await buyButton.trigger("click");
    const itemsInStore = store.state.basket.items;
    expect(itemsInStore.length).toBe(1);
  });
});
