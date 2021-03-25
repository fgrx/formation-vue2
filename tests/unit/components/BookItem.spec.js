import BookItem from "@/components/BookItem"
import { shallowMount,createLocalVue } from "@vue/test-utils"

import basket from "@/store/modules/basket"
import Vuex from 'vuex'

import {book} from "../../mock/book"

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store

beforeEach(()=>{
    store = new Vuex.Store({
      modules: {
        basket
      }
    })
    wrapper = shallowMount(BookItem,{propsData:{book},store,localVue})
})

afterEach(()=>{
    wrapper.destroy()
})

describe("BookItem >>>>>",()=>{
    it('should be mounted', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    it('should contain a title',()=>{
        expect(wrapper.find("[data-test-id='title-book']").text()).toContain(book.title)
    })

    it("should add to store when buy button is clicked",async()=>{
        const buyButton=wrapper.find("[data-test-id='buyButton']")
        await buyButton.trigger("click")
        const itemsInStore = store.state.basket.items
        expect(itemsInStore.length).toBe(1)
    })
})
