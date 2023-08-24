"use client";
import { useEffect, useState } from "react";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import Image from "next/image";
import printer from "@/assets/printer.svg";
import share from "@/assets/share.svg";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import StatusMessageModal from "@/app/admin/components/StatusMessageModal";
const GeneratePDF = () => {
  const [PDFContent, setPDFContent] = useState<any>(undefined);
  const [PDFLoading, setPDFLoading] = useState<boolean>(false);
  const [StatusMessModal, setStatusMessModal] = useState<boolean>(false);
  const auth: any = useAppSelector((state: any) => state.auth);

  const pathname = usePathname();
  useEffect(() => {
    if (auth.PDFRecipe) {
      const recipePDF: Recipe = auth.PDFRecipe;
      const Ingredient =
        recipePDF?.ingredients?.map((ingre: any) => {
          return `<tr>
            <td style="width: 33%; text-align: center;">
              <span>${ingre?.name}</span>
            </td>
            <td style="width: 33%; text-align: center;">
              <span>${ingre?.amount}</span>
            </td>
            <td style="width: 33%; text-align: center;">
              <span>${ingre?.measurement}</span>
            </td>
            </tr>`;
        }) ?? [];
      const nutrition =
        recipePDF?.nutrition?.map((nutri: any) => {
          return `<tr>
            <td style="width: 33%; text-align: center;">
              <span>${nutri?.name}</span>
            </td>
            <td style="width: 33%; text-align: center;">
              <span>${nutri?.quantity}</span>
            </td>
            </tr>`;
        }) ?? [];
      const str = `<div>
        <div style="margin-bottom:0px;">
          <img src="${
            recipePDF?.imageLink ?? "https://via.placeholder.com/450x330"
          }" style="border-radius:13px;" alt="" />
        </div>
        <div  style="margin-bottom:0px;">
          <h3>${recipePDF?.name}</h3>
        </div>
        <div  style="margin-bottom:0px;">
          <p style="margin-bottom:0px;">${recipePDF?.origin}</p>
        </div>
        <div  style="margin-bottom:0px;">
        <table
        style="
          border: none;
          width: 100%;
          margin-left: 12px;
          margin-top: 0px;
        "
      >
      <thead>
      <tr>
          <th style="width: 33%; text-align: center;">
            <span>Preparation</span>
          </th>
          <th style="width: 33%; text-align: center;">
            <span>Cook</span>
          </th>
          <th style="width: 33%; text-align: center;">
            <span>Serve</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width: 33%; text-align: center;">
            <span>${`${recipePDF?.preparation_time?.days} days ${recipePDF?.preparation_time?.hours} hours ${recipePDF?.preparation_time?.minutes} minutes`}</span>
          </td>
          <td style="width: 33%; text-align: center;">
            <span>${`${recipePDF?.cook_time?.days} days ${recipePDF?.cook_time?.hours} hours ${recipePDF?.cook_time?.minutes} minutes`}</span>
          </td>
          <td style="width: 33%; text-align: center;">
            <span>${recipePDF.serves}</span>
          </td>
        </tr>
      </tbody>
      </table>
        <h3 style="margin-top:20px;">Ingredients</h3>
        <table
        style="
          border: none;
          width: 100%;
          margin-left: 12px;
          margin-top: 0px;
        "
      >
      <thead>
      <tr>
          <th style="width: 33%; text-align: center;">
            <span>Ingredient</span>
          </th>
          <th style="width: 33%; text-align: center;">
            <span>Amount</span>
          </th>
          <th style="width: 33%; text-align: center;">
            <span>Measurement</span>
          </th>
        </tr>
      </thead>
      <tbody>
            ${Ingredient}
      </tbody>
      </table>
      <h3 style="margin-top:20px;">Preparation</h3>
      <p style="margin-bottom:0px;">${recipePDF?.preparation}</p>
      <h3 style="margin-top:20px;">origin</h3>
      <p style="margin-bottom:0px;">${recipePDF?.origin}</p>
      <h3 style="margin-top:20px;">Nutrition</h3>
        <table
        style="
          border: none;
          width: 100%;
          margin-left: 12px;
          margin-top: 0px;
        "
      >
      <thead>
      <tr>
          <th style="width: 33%; text-align: center;">
            <span>Ingredient</span>
          </th>
          <th style="width: 33%; text-align: center;">
            <span>Quantity</span>
          </th>
        </tr>
      </thead>
      <tbody>
            ${nutrition}
      </tbody>
      </table>
        </div>
      </div>`;
      const ret = htmlToPdfmake(str, {
        // @ts-ignore
        imagesByReference: true,
        tableAutoSize: true,
      });
      setPDFContent(ret);
    }
  }, [auth.PDFRecipe]);
  function capitalizeString(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const GeneratePDF = async () => {
    if (
      auth?.PDFRecipe === undefined ||
      !pathname.startsWith("/recipe-detail")
    ) {
      return setStatusMessModal(true);
    }
    setPDFLoading(true);
    const fonts = {
      Arial: {
        normal:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
        bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
        italics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
        bolditalics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
      },
      Roboto: {
        normal:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
        bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
        italics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
        bolditalics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
      },
    };
    var dd: any = {
      pageSize: "A4",
      // margin: [left, top, right, bottom]
      pageMargins: [50, 30, 50, 30],
      content: PDFContent.content,
      defaultStyle: {
        font: "Arial",
      },
      images: PDFContent.images,
    };
    // pdfMake
    //   .createPdf(dd, undefined, fonts)
    //   .download(`${capitalizeString(auth.PDFRecipe.name)} Recipe`);
    pdfMake.createPdf(dd, undefined, fonts).getBuffer((buffer) => {
      // Download the PDF file
      const blob = new Blob([buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${capitalizeString(auth.PDFRecipe.name)} Recipe`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setPDFLoading(false);
      // save&Export
      // $(downloadBtn).text(`Download PDF`).attr({ disabled: false });
    });
  };
  const HandlerCloseModal = () => {
    setStatusMessModal(false);
    // setSuccessMess({ status: false, message: "" });
  };
  return (
    <>
      <StatusMessageModal
        show={StatusMessModal}
        HandlerClose={HandlerCloseModal}
        Content={{
          message: "Please select recipe before PDF!",
          status: true,
        }}
      />
      <div className="d-flex gap-2 align-items-center h-100">
        {PDFLoading ? (
          <div>
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <span className="headerIcon">
            <i className="bi bi-share-fill"></i>
          </span>
        )}
         <span className="headerIcon" onClick={GeneratePDF}>
         <i className="bi bi-printer-fill"></i>
          </span>
      </div>
    </>
  );
};

export default GeneratePDF;
