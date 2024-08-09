"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import front from "../../../../../../../public/postura/front.png";
import back from "../../../../../../../public/postura/back.png";
import profile from "../../../../../../../public/postura/profile.png";
import Button from "@/components/ui/button";
import FormTitle from "@/components/title/formTitle";
import { useForm } from "react-hook-form";
import { Area } from "react-easy-crop";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
register();
import { useApiProvider } from "@/contexts";
import ImageCropper from "@/components/imageCropper/imageCropper";

type FormData = {
  date: string;
  atletaModel: string | number;
  front: string;
  back: string;
  profile: string;
};

type Params = {
  id: number | string;
};

type Props = {
  params: Params;
};

type Page = "choose-img" | "crop-img" | "img-cropped";

const PosturalEvaluationToApi = (data: FormData) => {
  return [
    {
      avaliacaoPosturalPK: {
        atletaModel: {
          id: data.atletaModel,
        },
        posicao: "FRENTE",
        data: data.date,
      },
      foto: data.front,
    },
    {
      avaliacaoPosturalPK: {
        atletaModel: {
          id: data.atletaModel,
        },
        posicao: "PERFIL",
        data: data.date,
      },
      foto: data.profile,
    },
    {
      avaliacaoPosturalPK: {
        atletaModel: {
          id: data.atletaModel,
        },
        posicao: "COSTAS",
        data: data.date,
      },
      foto: data.back,
    },
  ];
};

const PosturalEvaluation = ({ params: { id } }: Props) => {
  const [currentPage, setCurrentPage] = useState<Page>("choose-img");
  const [selectedImages, setSelectedImages] = useState({
    front: null,
    back: null,
    profile: null,
  });
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [currentImageType, setCurrentImageType] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { post } = useApiProvider();

  useEffect(() => {
    if (selectedImages.front && selectedImages.back && selectedImages.profile) {
      setImageErrors(null);
    }
  }, [selectedImages]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result as string);
        setCurrentImageType(id);
        setCurrentPage("crop-img");
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleCropComplete = (croppedArea: Area) => {
    if (imageToCrop && currentImageType) {
      cropImage(imageToCrop, croppedArea, (croppedImage) => {
        const updatedImages = {
          ...selectedImages,
          [currentImageType]: croppedImage,
        };
        setSelectedImages(updatedImages);
        setValue(currentImageType as keyof FormData, croppedImage);
        setCurrentPage("choose-img");
      });
    }
  };

  const cropImage = (
    imageSrc: string,
    croppedArea: Area,
    setImageAfterCrop: (croppedImage: string) => void
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;
    const context = canvas.getContext("2d");

    if (context) {
      const imageObj = new window.Image();
      imageObj.src = imageSrc;
      imageObj.onload = () => {
        context.drawImage(
          imageObj,
          croppedArea.x,
          croppedArea.y,
          croppedArea.width,
          croppedArea.height,
          0,
          0,
          croppedArea.width,
          croppedArea.height
        );

        const croppedImage = canvas.toDataURL("image/jpeg");
        setImageAfterCrop(croppedImage);
      };
    }
  };

  const clearSelectedImages = () => {
    setSelectedImages({
      front: null,
      back: null,
      profile: null,
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (
        !selectedImages.front ||
        !selectedImages.back ||
        !selectedImages.profile
      ) {
        setImageErrors("Todas as imagens são obrigatórias");
        return;
      }
      data.atletaModel = id;
      const preparedData = PosturalEvaluationToApi(data);
      console.log("Prepared Data:", JSON.stringify(preparedData, null, 2));
      const response = await post(
        "avaliacaopostural",
        PosturalEvaluationToApi(data)
      );
      if (response?.status !== 201) {
        throw new Error("Erro ao cadastrar avaliação Postural");
      }
      reset();
      clearSelectedImages();
      setImageErrors(null);
    } catch (error) {
      console.error("Erro ao cadastrar campeonato Api:", error);
      throw error;
    }
  };

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      {currentPage === "choose-img" && (
        <div className="form-container flex flex-col justify-between items-center h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-between"
          >
            <div className="flex justify-center items-end pb-16">
              <FormTitle
                title="Avaliação Postural"
                iconSrc="/icons/ava_post2.png"
              />
            </div>
            <div className="flex flex-col justify-between items-center">
              <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                onSlideChange={(swiper) => handleSlideChange(swiper)}
                initialSlide={currentSlide}
                className="flex w-72 h-80 z-0 mb-6"
              >
                <SwiperSlide className="flex w-80 h-80 items-center justify-center">
                  <label htmlFor="front">
                    <Image
                      src={selectedImages.front || front}
                      alt="imagem do atleta"
                      width={288}
                      height={288}
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
                <SwiperSlide className="flex w-80 h-80 items-center justify-center">
                  <label htmlFor="back">
                    <Image
                      src={selectedImages.back || back}
                      alt="imagem do atleta"
                      width={288}
                      height={288}
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
                <SwiperSlide className="flex w-80 h-80 items-center justify-center">
                  <label htmlFor="profile">
                    <Image
                      src={selectedImages.profile || profile}
                      alt="imagem do atleta"
                      width={288}
                      height={288}
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

              {imageErrors && (
                <p className="text-center text-red-500 py-1">{imageErrors}</p>
              )}

              <div className="flex mt-6 mb-2 pb-9">
                <label
                  htmlFor="date"
                  className="inline-block w-14 text-center text-base font-semibold"
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

              {errors.date && (
                <p className="text-center text-red-500 py-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <Button
              text="Cadastrar"
              type="submit"
              className="mt-4 mb-2 mx-auto px-6"
            />
          </form>
        </div>
      )}
      {currentPage === "crop-img" && imageToCrop && (
        <div className="m-auto size-full">
          <ImageCropper
            imageSrc={imageToCrop}
            onCropDone={handleCropComplete}
            onCropCancel={() => setCurrentPage("choose-img")}
          />
        </div>
      )}
    </section>
  );
};

export default PosturalEvaluation;
