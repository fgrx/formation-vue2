import { shallowMount } from "@vue/test-utils";
import Price from "@/components/Price";
import Vuetify from "vuetify";

import {book} from "../../mock/book"


let wrapper;

const roundNumber=(number)=>Math.round(number*100)/100

beforeEach(() => {
  const vuetify = new Vuetify();
  wrapper = shallowMount(Price, {
    propsData: { book },vuetify
  });
});

afterEach(()=>{
    wrapper.destroy()
})

describe("Price component", () => {
  it("should be Mounted", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("should display the price", () => {
    expect(wrapper.find("[data-test-id='price']").text()).toContain(book.price);
  });

  it("should display promotion", () => {
    expect(wrapper.find("[data-test-id='discount']").text()).toContain(
      book.discount
    );

    expect(wrapper.find("[data-test-id='price']").classes('strike')).toBeTruthy()
  });


  it("should switch between euros and dollars",async()=>{
      //Display price in euros
      const convertButton=wrapper.find("[data-test-id='convertButton']")
      expect(wrapper.find("[data-test-id='price']").text()).toContain(`${book.price}€`);
      expect(convertButton.text()).toContain("$")
      
      const dollarsExchangeRate=0.84
      
      // Mock function that fetch the API
      const mockGetExchangeRate = jest.fn()
      mockGetExchangeRate.mockReturnValue(dollarsExchangeRate)
      wrapper.vm.getExchangeRate=mockGetExchangeRate
      
      
      wrapper.vm.exchangeRate=dollarsExchangeRate

    // Display price in dollars
      await convertButton.trigger('click')
      await wrapper.vm.convertToAction()
      expect(mockGetExchangeRate).toHaveBeenCalled()

      const priceConversionInDollars=book.price*dollarsExchangeRate
      expect(wrapper.find("[data-test-id='price']").text()).toBe(`${priceConversionInDollars}$`);
      if(book.discount){
       const discountInDollars=roundNumber(book.discount*dollarsExchangeRate)
       expect(wrapper.find("[data-test-id='discount']").text()).toBe(`${discountInDollars}$`);
      }
      expect(convertButton.text()).toContain("€")

    //display price in euros again
      await convertButton.trigger('click')
      await wrapper.vm.convertToAction()
      expect(convertButton.text()).toContain("$")
      expect(wrapper.find("[data-test-id='price']").text()).toBe(`${book.price}€`);
      if(book.discount){
          expect(wrapper.find("[data-test-id='discount']").text()).toBe(`${book.discount}€`);

      }
  })

  it("should should not display the price", () => {
    book.quantity = 0;
    const wrapper = shallowMount(Price, {
      propsData: { book },
    });
    expect(wrapper.find("[data-test-id='price']").exists()).toBeFalsy();
  });


});

