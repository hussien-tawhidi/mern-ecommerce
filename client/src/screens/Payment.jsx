import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ShippingSteps from "../components/ShippingSteps";
import { useDispatch, useSelector } from "react-redux";
import { paymentMethod } from "../app/cart/cartActionss";
import { useState } from "react";

const formSchema = Yup.object({
  payment: Yup.string().required("address is required"),
});

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      payment: "master card",
    },
    onSubmit: (values) => {
      dispatch(paymentMethod(values));
      navigate("/place-order");
    },
    validationSchema: formSchema,
  });

  return (
    <div className='payment mt-4 w-50 mx-auto'>
      <ShippingSteps step1 step2 step3 />
      <h3 className='mt-4'>Payment Method</h3>
      <form onSubmit={formik.handleSubmit}>
        <label className='w-100 my-4 '>
          <input
            id='payment'
            type='radio'
            value={formik?.values?.payment}
            name='payment'
            onChange={formik.handleChange}
            defaultChecked={formik.values.payment === "male"}
          />
          <span className='mx-3'>
            <i class='bi bi-credit-card'></i>
          </span>
          <span>master card</span>
        </label>

        <button className='btn btn-secondary' type='submit'>
          Continue
        </button>
      </form>
    </div>
  );
}
