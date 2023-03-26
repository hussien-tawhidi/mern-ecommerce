import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../app/cart/cartActionss";
import ShippingSteps from "../components/ShippingSteps";

const formSchema = Yup.object({
  address: Yup.string().required("address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
});

export default function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    onSubmit: (values) => {
      dispatch(saveShippingAddress(values));
      navigate("/payment");
    },
    validationSchema: formSchema,
  });

  const userInfo = useSelector((state) => state?.user);
  const { loginAppErr, loginServerErr} = userInfo;

  return (
    <div className='w-25 mx-auto'>
      <ShippingSteps step1 step2 />
      <div className='login'>
        <form className='form py-4' onSubmit={formik.handleSubmit}>
          {loginAppErr || loginServerErr ? (
            <div className='custome-alert-danger custome-alert-danger mx-4'>
              <div className='alert alert-danger' role='alert'>
                {loginAppErr}
                {loginServerErr}
              </div>
            </div>
          ) : null}
          <div className='form-field mb-2'>
            <label htmlFor='address' className='my-2'>
              Address :
            </label>
            <label className='w-100'>
              <input
                id='address'
                type='text'
                name='address'
                placeholder='Address ... '
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                onBlur={formik.handleBlur("address")}
                className='form-control w-100'
              />
            </label>
            {formik.touched.address && (
              <div className='custome-alert-danger'>
                {formik.errors.address}
              </div>
            )}
          </div>
          <div className='form-field mb-2'>
            <label htmlFor='city' className='my-2'>
              City :
            </label>

            <label className='w-100'>
              <input
                id='city'
                type='city'
                name='city'
                placeholder='City ...'
                value={formik.values.city}
                onChange={formik.handleChange("city")}
                onBlur={formik.handleBlur("city")}
                className='form-control w-100'
              />
            </label>
            {formik.touched.city && (
              <div className='custome-alert-danger'>{formik.errors.city}</div>
            )}
          </div>
          <div className='form-field mb-2'>
            <label htmlFor='postCode' className='my-2'>
              Post code :
            </label>

            <label className='w-100'>
              <input
                id='postalCode'
                type='number'
                name='postalCode'
                placeholder='Postal code ...'
                value={formik.values.postalCode}
                onChange={formik.handleChange("postalCode")}
                onBlur={formik.handleBlur("postalCode")}
                className='form-control w-100'
              />
            </label>
            {formik.touched.postalCode && (
              <div className='custome-alert-danger'>
                {formik.errors.postalCode}
              </div>
            )}
          </div>
          <div className='form-field mb-2'>
            <label htmlFor='country' className='my-2'>
              Country :
            </label>
            <label className='w-100'>
              <input
                id='country'
                type='text'
                name='country'
                placeholder='Country ...'
                value={formik.values.country}
                onChange={formik.handleChange("country")}
                onBlur={formik.handleBlur("country")}
                className='form-control w-100'
              />
            </label>
            {formik.touched.country && (
              <div className='custome-alert-danger'>
                {formik.errors.country}
              </div>
            )}
          </div>

          <button
            type='submit'
            className='btn btn-info w-100'
            disabled={
              formik?.values?.address === "" ||
              formik?.values?.address === " " ||
              formik?.values?.postalCode === "" ||
              formik?.values?.postalCode === " " ||
              formik?.values?.city === " " ||
              formik?.values?.city === "" ||
              formik?.values?.country === "" ||
              formik?.values?.country === " "
            }>
            <div className='arrow-wrapper'>
              <span className='arrow'></span>
            </div>
            <p className='button-text'>Continue ...</p>
          </button>
        </form>
      </div>
    </div>
  );
}
