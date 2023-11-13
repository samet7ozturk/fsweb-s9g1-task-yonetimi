import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn }) {
  const emptyData = {
    name: "",
    description: "",
    people: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ defaultValues: { ...emptyData }, mode: "onBlur" });

  const onSubmit = (formData) => {
    console.log("formData > ", formData);
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
          <input
            className="input-text"
            type="text"
            {...register("name", {
              required: "Başlık alanı boş bırakılamaz!",
              minLength: {
                value: 3,
                message: "Başlık üç karakterden az olamaz!",
              },
            })}
          ></input>
        </label>
        <div className="input-error">{errors?.name?.message}</div>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
          <input
            className="input-textarea"
            type="text"
            {...register("description", {
              required: "Açıklama alanı boş bırakılamaz!",
              minLength: {
                value: 10,
                message: "Açıklama on karakterden az olamaz!",
              },
            })}
          ></input>
          <div className="input-error">{errors?.description?.message}</div>
        </label>
      </div>

      <div className="form-line">
        <label className="input-label">Kişiler</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people")}
              />
              {p}
              <div className="validation-error">{errors?.people?.message}</div>
            </label>
          ))}
        </div>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
