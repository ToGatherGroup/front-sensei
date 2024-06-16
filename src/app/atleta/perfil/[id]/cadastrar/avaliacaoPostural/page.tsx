"use client";
import Image from "next/image";
import front from "../../../../../../../public/postura/front.png";
import back from "../../../../../../../public/postura/back.png";
import profile from "../../../../../../../public/postura/profile.png";
import Button from "../../../../../../components/button";
import FormTitle from "@/components/title/formTitle";
import { useForm } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";

type Params = {
  id: number | string;
};

type Props = {
  params: Params;
};

const PosturalEvaluation = ({ params: { id } }: Props) => {
  const [selectedImages, setSelectedImages] = useState({
    front: null,
    back: null,
    profile: null,
  });
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const handleImageChange = (event: any) => {
    const { id, files } = event.target;
    if (files && files[0]) {
      console.log("Image selected:", id, files[0]);
      setSelectedImages((prevImages) => ({
        ...prevImages,
        [id]: URL.createObjectURL(files[0]),
      }));
      setValue(id, files);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center">
        <div className="form-container">
          <div className="flex-col justify-center items-center mb-6">
            <FormTitle
              title="Avaliação Postural"
              iconSrc="/icons/posture_icon.png"
            />
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div>
                <Swiper
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  navigation
                  className="flex w-72 h-80 z-0"
                >
                  <SwiperSlide className="flex w-80 h-80 items-center justify-center z-10 ">
                    <label htmlFor="front" className="">
                      <Image
                        src={selectedImages.front || front}
                        alt="imagem do atleta"
                        className="block m-auto object-contain max-w-72 max-h-72"
                      />
                    </label>
                    <input
                      type="file"
                      id="front"
                      accept="image/png"
                      className="hidden"
                      {...register("front")}
                      onChange={handleImageChange}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="flex w-80 h-80 items-center justify-center z-10 ">
                    <label htmlFor="back" className="">
                      <Image
                        src={selectedImages.back || back}
                        alt="imagem do atleta"
                        className="block m-auto object-contain max-w-72 max-h-72"
                      />
                    </label>
                    <input
                      type="file"
                      id="back"
                      accept="image/png"
                      className="hidden"
                      {...register("back")}
                      onChange={handleImageChange}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="flex w-80 h-80 items-center justify-center z-10 ">
                    <label htmlFor="front" className="">
                      <Image
                        src={selectedImages.profile || profile}
                        alt="imagem do atleta"
                        className="block m-auto object-contain max-w-72 max-h-72"
                      />
                    </label>
                    <input
                      type="file"
                      id="profile"
                      accept="image/png"
                      className="hidden"
                      {...register("profile")}
                      onChange={handleImageChange}
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="flex mx-auto my-6 box-border items-center">
                <label
                  htmlFor="date"
                  className="inline-block w-28 text-center text-base font-semibold ps-10"
                >
                  Data
                </label>
                <input
                  {...register("date", {
                    required: "Data é obrigatório",
                    validate: {
                      notInFuture: (value) => {
                        const today = new Date().toISOString().split("T")[0];
                        return value <= today || "A data não pode ser futura";
                      },
                    },
                  })}
                  type="date"
                  id="date"
                  className="bg-gray-200 w-42 px-4 py-1 rounded"
                />
              </div>
              <div>
                {errors.date && (
                  <p className="text-center text-red-500 py-1">
                    {/* {errors.date.message} */}
                  </p>
                )}
              </div>
              <Button label="Cadastrar" type="submit" />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PosturalEvaluation;
