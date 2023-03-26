import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  userUpadteProfileAction,
} from "../app/userAuth/userActions";

const formSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
});

export default function UpdateProfile() {
  const { _id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userInfo = useSelector((state) => state?.user);
  const {
    profileAppErr,
    profileServerErr,
    loginLoading,
    userAuth,
    isUpdateProfile,
  } = userInfo;

  console.log(userInfo);
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userAuth?.name,
      email: userAuth?.email,
    },

    onSubmit: (values) => {
      dispatch(userUpadteProfileAction(values));
    },
    validationSchema: formSchema,
  });

  if (isUpdateProfile) {
  navigate(`/profile/${userAuth?.id}`);
}
  return (
    <div className='register'>
      <div className='login'>
        <form className='form' onSubmit={formik.handleSubmit}>
          {profileAppErr || profileServerErr ? (
            <div className='custome-alert-danger custome-alert-danger mx-4'>
              <div className='alert alert-danger' role='alert'>
                <span className='mx-3'>{profileServerErr}</span>
                {profileAppErr}
              </div>
            </div>
          ) : null}
          <div className='form-field'>
            <label>
              <i className='bi bi-person'></i>
              <input
                id='text'
                type='name'
                name='name'
                placeholder='Name '
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
              />
            </label>
            {formik?.touched?.name && (
              <div className='custome-alert-danger'>{formik?.errors?.name}</div>
            )}
            <label>
              <i className='bi bi-envelope-at'></i>
              <input
                id='email'
                type='email'
                name='email'
                placeholder='Email '
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
            </label>
            {formik.touched.email && (
              <div className='custome-alert-danger'>{formik.errors.email}</div>
            )}
          </div>
          {loginLoading ? (
            <button type='submit' className='button'>
              <span
                className='spinner-grow spinner-grow-sm'
                role='status'
                aria-hidden='true'></span>
              <span className='sr-only'>Loading...</span>
            </button>
          ) : (
            <button type='submit' className='button'>
              <div className='arrow-wrapper'>
                <span className='arrow'></span>
              </div>
              <p className='button-text'>Update Account</p>
            </button>
          )}
        </form>
        {/* <div className='more-content'>
          <Link to='/reset-password-token'>forgot password</Link>
          <p>
            or don't have account ? <Link to='/register'>Register</Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}
