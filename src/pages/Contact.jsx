import { useForm } from "react-hook-form";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: "",
    type: "",
  });

  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });
    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      setDisabled(true);

      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      await emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, templateParams, import.meta.env.VITE_PUBLIC_KEY);

      toggleAlert("Form submission was successful!", "success");
    } catch (e) {
      console.error(e);
      toggleAlert("Uh oh. Something went wrong.", "danger");
    } finally {
      setDisabled(false);
      reset();
    }
  };
  return (
    <>
      <div className="contact__Form">
        <h1 className="post__heading">Contact Us</h1>
        <p className="contact-text">If you gave any queries regarding this site, feel free to submit this form.</p>
        <form id="contact-form" className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="post__heading">Contact Us</h1>
          <p className="contact-text">If you have any queries regarding this site, feel free to submit this form.</p>
          <input
            type="text"
            name="name"
            {...register("name", {
              required: {
                value: true,
                message: "Please enter your name",
              },
              maxLength: {
                value: 30,
                message: "Please use 30 characters or less",
              },
            })}
            className="form__input"
            placeholder="Name"
          ></input>
          {errors.name && <span className="errorMessage">{errors.name.message}</span>}
          <input
            type="email"
            name="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
            className="form__input"
            placeholder="Email address"
          ></input>
          {errors.email && <span className="errorMessage">Please enter a valid email address</span>}
          <input
            type="text"
            name="subject"
            {...register("subject", {
              required: {
                value: true,
                message: "Please enter a subject",
              },
              maxLength: {
                value: 75,
                message: "Subject cannot exceed 75 characters",
              },
            })}
            className="form__input"
            placeholder="Subject"
          ></input>
          {errors.subject && <span className="errorMessage">{errors.subject.message}</span>}
          <textarea
            rows={3}
            name="message"
            {...register("message", {
              required: true,
            })}
            className="form__input"
            placeholder="Message"
          ></textarea>
          {errors.message && <span className="errorMessage">Please enter a message</span>}
          <button className="form__button" disabled={disabled} type="submit">
            Submit
          </button>
        </form>
      </div>
      {alertInfo.display && (
        <div className={`alert alert-${alertInfo.type} alert-dismissible mt-5`} role="alert">
          {alertInfo.message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setAlertInfo({ display: false, message: "", type: "" })} // Clear the alert when close button is clicked
          ></button>
        </div>
      )}
    </>
  );
};

export default Contact;
