import { useState } from "react";
import ModalContainer from "./ui/modal-container";
import { Typography } from "./ui/typography";
import { Icon } from "./ui/icons";
import { useModal } from "./ui/modalcontext";
import { Button } from "./ui/button";

const TermsOfUseModal = () => {
  const { termsModalState, setTermsModal } = useModal();

  return (
    <ModalContainer
      size={"lg"}
      showModal={termsModalState}
      setCloseModal={setTermsModal}
    >
      <div className=" flex justify-between  font-semibold  mb-2">
        <Typography size={"xxl"} bold={"bold"}>
          Terms & Conditions
        </Typography>
        <Button variant={"closeBtn"} rounded={"full"} size={"sm"}>
          <Icon
            onClick={() => {
              setTermsModal(false);
            }}
            type="crossIcon"
          />
        </Button>
      </div>
      <div className="space-y-3 overflow-y-auto h-[30rem]   my-4">
        <Typography variant={"paragraph"} size={"sm"}>
          Please read these terms and conditions carefully before using this web
          site, web browser, mobile site and APP included. Your use of
          www.lifepharmacy.com (this "Web Site") confirms your acceptance of the
          following terms and conditions
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          1. Products, Content and Specifications
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          Life Pharmacy makes all reasonable efforts to accurately display all
          attributes of our products. The product information provided is
          accurate to the best of our knowledge at the time of publishing. We
          may make changes in information without notice.
          <br />
          <br />
          Information provided on this website is suitable only as general
          information. Please read the instructions and ingredients on the
          products carefully before using them. www.lifepharmacy.com will not be
          responsible for any side effects. Always consult your Doctor or
          Pharmacist for advice on your specific treatment needs. Please visit
          in person at any one of our branches to consult our pharmacists for
          advice.
          <br />
          <br />
          It is your responsibility to ascertain and obey all applicable local
          laws in regard to the possession, use and sale of any item purchased
          from this Website. By placing an order, you agree that the products
          ordered will be used only in a lawful manner.
          <br />
          <br />
          We reserve the right, without prior notice, to limit the order
          quantity on any product or service and/or to refuse service to any
          customer. We also may require verification of information prior to the
          acceptance and/or shipment of any order.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          Delivery, Payments & Shipping
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          When an order is placed, it will be shipped to the address provided at
          the time of purchase. All orders within the UAE are delivered within 2
          - 5 business days excluding public holidays and weekends.
          <br />
          <br />
          Delivery charges (valid for one order delivered to one address only)
          will be calculated automatically at checkout based on weight and
          destination. Please note that the order value mentioned for free
          shpping is excluding VAT. We will attempt to deliver your items on the
          date you specify. Our delivery partner will contact you on the day of
          delivery to ensure someone is available to receive your package. If
          our delivery partner is unable to deliver for any reason, our partner
          will contact you by telephone the following business day to arrange an
          alternative delivery date. You will be required to sign a delivery
          receipt at the time of delivery.
          <br />
          <br />
          Products or services are subject to availability. In the event that a
          product runs out of stock after we receive your order, we will contact
          you via the details provided at the time of placing an order to advise
          you. Life Pharmacy reserves the right to process, hold or cancel any
          order depending on stock availability and/or payment failure.
          <br />
          <br />
          In case that incorrect contact details have been provided, redelivery
          will be charged as per package weight and destination. Should an
          incorrect item be dispatched, please contact our customer service team
          for a pickup and/or replacement as needed. No delivery fee will be
          charged for this service.
          <br />
          <br />
          When ordering from LifePharmacy.com, you are responsible for assuring
          the product can be lawfully imported to the destination country. For
          international shipping and deliveries, packages may be subject to
          customs charges, tariffs, duties, taxes and fees, and must comply with
          all laws and regulations of the destination country. Additional
          charges for customs clearance and compliance with the laws and
          regulations of the destination country must be fulfilled by the
          recipient, you, as the customer and as the importer of record; Life
          Pharmacy has no control over customs clearance charges, nor can we
          predict what they may be.
          <br />
          <br />
          Life Pharmacy will not bear any responsibility for non-delivery and no
          refunds will be processed due to non-payment of customs charges.
          Customs policies vary widely from country to country; you should
          contact your local customs office for more information.
          <br />
          <br />
          All the Online Orders are tokenized while authorization and we may
          initiate MOTO transactions in case we identify the payments are not
          fully captured for the amount actually invoiced. In some cases, our
          customer executives will contact the customer if MOTO transaction gone
          failure and recapture of amount is needed for the fully delivered
          order and Life Pharmacy reserves the right to capture the same amount
          from an alternate registered credit/debit card to complete the
          transaction.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          3. Refund, Cancellation & Exchange policy
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          3.1 For defective items supplied from the manufacturer, you will be
          eligible for an exchange, refund, coupon or voucher if the item(s) is
          returned within 3 days from the date of delivery along with the
          e-payment confirmation.
          <br />
          <br />
          <b>3.2</b> Promotional & free gift items are strictly NOT refundable
          unless in the rare case of a manufacturing defect subject to the
          discretion of www.Lifepharmacy.com
          <br />
          <br />
          <b>3.3</b> Notwithstanding any laws or otherwise, no exchange or
          refund will be made for non-defective, correctly delivered products.
          <br />
          <br />
          <b>3.4</b> Pricing errors - Although we do our best to ensure prices
          stated on this website are accurate, errors may occur in some cases.
          Where a pricing error occurs we will not be bound by the incorrect
          pricing stated, and reserve the right to cancel your purchase.
          <br />
          <br />
          <b>3.5</b> a)Exchange request for non-defective, correctly delivered
          products-(Discretion of www.lifepharmacy.com) should be made within 3
          days from the date of delivery and a pickup fee of 25 AED For Dubai,
          35 AED for other Emirates will be charged.
          <br />
          <br />
          b)International shipments outside the UAE will be charged 50 AED
          Minimum + Tax + Government Levy and additional charges will apply
          depending on the weight of the item.
          <br />
          <br />
          c)All products to be exchanged must be returned in their original
          packaging along with the original accessories (Product should be in
          its original condition) within 3 days from the date of delivery.
          <br />
          <br />
          d)www.lifepharmacy.com reserves the right to deny any exchange for
          cases subject to hygiene.
          <br />
          <br />
          e)www.lifepharmacy.com reserves the right to amend this policy without
          prior notice.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          4. Free Gifts
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>4.1</b> All orders placed with a qualifying spend during the
          promotional period will be eligible to receive the appropriate free
          gift (whilst stocks last, 1 per order).
          <br />
          <br />
          <b>4.2</b> The gift will be added to your shopping cart automatically
          at checkout with AED 0.00 value. If you add the gift manually to the
          shopping cart, it will be count as a normal product with regular price
          instead of a gift. <br />
          <br />
          <b>4.3</b> All free gifts are subject to availability,
          non-transferable and there are no cash alternatives or any other gift.
          <br />
          <br />
          <b>4.4</b> Refund: If your order fails to be qualified for a free gift
          after the refund, the gift should be returned with your order, or we
          will deduct the full price of the gift from your refund.
          <br />
          <br />
          <b>4.5</b>www.lifepharmacy.com reserves the right to deny delivery of
          free gifts without prior notice subject to stock availability.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          5. Coupon Codes
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>5.1</b> For one-time use only.
          <br />
          <br />
          <b>5.2</b> Code cannot be transferred or exchanged for cash. <br />
          <br />
          <b>5.3</b> The Coupon Codes are subject to change and is at the
          discretion of Life Pharmacy Management.
          <br />
          <br />
          <b>5.4</b>No cash, product, credit or other alternative will be
          provided as a substitute to the promo code.
          <br />
          <br />
          <b>5.5</b> Free shipping will not be applicable if order value goes
          below the value mentioned for free shipping upon applying the coupon
          code.
          <br />
          <br />
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          6. Use of this Web Site
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          The design of this Web Site and all text, graphics, information,
          content, and other material displayed on or that can be downloaded
          from this Web Site are protected by copyright, trademark and may not
          be used except as permitted in these Terms and Conditions or with
          prior written permission of Life Pharmacy. All rights reserved. You
          may not modify the information or materials displayed on or that can
          be downloaded from this Web Site in any way or reproduce or publicly
          display, perform, or distribute or otherwise use any such information
          or materials for any public or commercial purpose. Any unauthorized
          use of any such information or materials may violate copyright laws,
          trademark laws, laws of privacy.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          7. Trademarks
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>7.1</b> We do not sell, rent or exchange any personally
          identifiable information that you provide to us through this Website
          with any third party for commercial reasons. However, we engage
          trusted online payment service partners to perform payment processing
          and authorization services (for net banking or credit/debit card
          validation). Through your use of the Lifepharmacy.com Services, you
          consent to our collection and transfer of your information to our
          payment service partner websites.
          <br />
          <br />
          <b>7.2</b> As with any business, it is possible that as our business
          develops, we might sell or buy other businesses or assets. In such
          transactions, User/Customer information is typically one of the
          transferred business assets. Accordingly, in the event that
          Lifepharmacy.com, or substantially all of our assets, is acquired by a
          third party, such information may be one of the assets that are
          transferred or acquired by a third party. Under such circumstances,
          Lifepharmacy.com would, to the extent possible, require the acquiring
          party to follow the practices described in this Privacy Policy. You
          acknowledge that such transfers may occur and that any acquirer of
          Lifepharmacy.com may continue to process your personal information as
          set forth in this Privacy Policy.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          8. Who Has Access to Your Information
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>7.2</b> Creating or maintaining any link from another Web site to
          any page on this Web Site without our prior written permission is
          prohibited. Any permitted links to this Web Site must comply will all
          applicable laws, rule and regulations.
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          9. Third-Party Links
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          From time to time, this Web Site may contain links to Web sites that
          are not owned, operated or controlled by Life Pharmacy or their
          respective affiliates. All such links are provided solely as a
          convenience to you. If you decide to access any other Web sites linked
          to or from this Web Site, you do so entirely at your own risk.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          10. Inappropriate Material{" "}
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          You are prohibited from posting or transmitting any unlawful,
          threatening, defamatory, libelous, obscene, pornographic or profane
          material or any material or comments that could constitute or
          encourage conduct that would be considered a criminal offense or give
          rise to civil liability, or otherwise violate any law. In addition to
          any remedies that we may have at law or in equity, if we determine, in
          our sole discretion, that you have violated or are likely to violate
          the foregoing prohibitions, we may take any action we deem necessary
          to cure or prevent the violation, including without limitation, the
          immediate removal of the related materials from this Website. We will
          fully cooperate with any law enforcement authorities or court order or
          subpoena requesting or directing us to disclose the identity of anyone
          posting such materials.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          11. User Information
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          Other than personally identifiable information, which is subject to
          this Web Site's Privacy Policy, any material, information,
          suggestions, ideas, concepts, know-how, techniques, questions,
          comments or other communication you transmit or post to this Web Site
          in any manner ("User Communications") is and will be considered
          non-confidential and non-proprietary. We retain the right to remove
          any or all User Communications that includes any material we deem
          inappropriate or unacceptable.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          12. Disclaimers
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          Your use of this site is at your risk. The information, materials and
          services provided on or through this web site are provided "as is"
          without any warranties of any kind including warranties of
          merchantability, fitness for a particular purpose, or non-infringement
          of intellectual property. Neither Life Pharmacy, nor any of their
          respective affiliates warrant the accuracy or completeness of the
          information, materials or services provided on or through this web
          site. The information, materials and services provided on or through
          this web site may be out of date, and neither Life Pharmacy, nor any
          of their respective affiliates makes any commitment or assumes any
          duty to update such information, materials or services. The foregoing
          exclusions of implied warranties do not apply to the extent prohibited
          by law. Please refer to the UAE laws for any such prohibitions.
          <br />
          <br />
          All products and services purchased on or through this web site are
          subject only to any applicable warranties of their respective
          manufacturers, distributors and suppliers if any. To the fullest
          extent permissible by applicable law, we hereby disclaim all
          warranties of any kind, either express or implied, including, any
          implied warranties with respect to the products and services listed or
          purchased on or through this web site. Without limiting the generality
          of the foregoing, we hereby expressly disclaim all liability for
          product defect or failure, claims that are due to normal wear, product
          misuse, abuse, product modification, improper product selection,
          non-compliance with any codes, or misappropriation. <br />
          <br />
          <br />
          While Life Pharmacy strives to ensure the accuracy of its product
          images and information, some manufacturing changes to packaging and/or
          ingredients may be pending updates on our site. Lifepharmacy.com is
          accurate and reliable however, no representation is made as to the
          completeness or accuracy of the information it contains. We will not
          be held accountable during a rare event of a technical glitch that may
          occur during maintenance or high peak hours which may cause
          discrepancies in your shopping bill or overall experience. This
          includes(but is not limited to) inconsistencies such as cached images
          on your device resulting in discrepancies on discounts, promotions,
          shipping charges etc.
          <br />
          <br />
          Voucher promotions such as redemptions or loyalty coupons are not
          applicable/redeemable on www.lifepharmacy.com.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          13. Liability
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          Your use of this site is at your risk. The information, materials and
          services provided on or through this web site are provided "as is"
          without any warranties of any kind including warranties of
          merchantability, fitness for a particular purpose, or non-infringement
          of intellectual property. Neither Life Pharmacy, nor any of their
          respective affiliates warrant the accuracy or completeness of the
          information, materials or services provided on or through this web
          site. The information, materials and services provided on or through
          this web site may be out of date, and neither Life Pharmacy, nor any
          of their respective affiliates makes any commitment or assumes any
          duty to update such information, materials or services. The foregoing
          exclusions of implied warranties do not apply to the extent prohibited
          by law. Please refer to the UAE laws for any such prohibitions.
          <br />
          <br />
          In the event of any problem with this web site or any content, you
          agree that your sole remedy is to cease using this web site. In the
          event of any problem with the products or services that you have
          purchased on or through this web site, you agree that your sole
          remedy, if any, is from the manufacturer of such products or supplier
          of such services, in accordance with such manufacturer's or supplier's
          warranty, or to seek a return and refund for such product or services
          in accordance with the returns and refunds policies posted on this web
          site. <br />
          <br />
          Voucher promotions such as redemptions or loyalty coupons are not
          applicable/redeemable on www.lifepharmacy.com.
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          14. Revisions to these Terms and Conditions
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          Life Pharmacy reserves the right to alter these terms and conditions
          from time to time by posting new terms and conditions on this web
          site. Please check the terms and conditions regularly.
          <br />
          <br />
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          15. Laws and Jurisdiction
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          These Terms and Conditions supersedes all prior written or oral
          representations, agreements or understandings relating to the subject
          matter of these Terms and Conditions (including any misrepresentation
          made by Life Pharmacy) between you and Life Pharmacy to the extent
          necessary to resolve any inconsistency or ambiguity between them.
          These Terms and Conditions will be governed by and construed in
          accordance with the laws of UAE, without giving effect to any
          principles of conflicts of laws. Any action seeking legal or equitable
          relief arising out of or relating to this Web Site will be brought
          only in the courts of the United Arab Emirates. A printed version of
          these Terms and Conditions will be admissible in judicial and
          administrative proceedings based upon or relating to these Terms and
          Conditions to the same extent and subject to the same conditions as
          other business documents and records originally generated and
          maintained in printed form. 
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          16. Termination
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          We reserve the right to suspend or terminate your account or your use
          of this website at any time. You are personally liable for any orders
          placed or charges incurred through your account prior to termination.
          We reserve the right to change, suspend, or discontinue all or any
          aspect of this Web Site at any time without notice.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          17. Arab Health Voucher
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>17.1</b>Flat discount of 25 AED is applicable to new App Downloads.{" "}
          <br />
          <br />
          <b>17.2</b>Coupon is valid for the app downloads from 24th Jan 2022 to
          27th Jan 2022
          <br />
          <br />
          <b>17.3</b>Activate the voucher before 27th Jan 2022 at the Rewards
          section of Profile in the mobile app to redeem.
          <br />
          <br />
          <b>17.4</b>Rewards can be redeemed at the cashier with Life Stores
          until 10th Feb 2022
          <br />
          <br />
          <b>17.5</b>Offer is not applicable with existing offers
          <br />
          <br />
          <b>17.6</b>Present the inApp voucher at the cashier to redeem it at
          the store.
          <br />
          <br />
          <b>17.7</b>Voucher is applicable to the purchase of the Brands below,
   
          <ul >
            <li>Sunshine Nutrition</li>
            <li>Nordic Sunshine</li>
            <li>NutritionL</li>
            <li>Muscle Core</li>
            <li>Nutrilac</li>
            <li>Super Life</li>
            <li>Trister</li>
            <li>Bebederm</li>
            <li>Tea Connection</li>
            <li>First Aid</li>
          </ul>
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          18. Package Terms
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>18.1</b>Lifepharmacy.com is the online seller of many brands and
          product over 50,000. The Product image shown in the website may change
          slightly according to the design like color, design and time of
          packaging.
          <br />
          <br />
          <b>18.2</b>Website Product image will be the image at the time of
          photoshoot by Life Graphics Team or brand provided at the time of
          listing with eLIFE or from authorized sources.
          <br />
          <br />
          <b>18.3</b> Brand owner/Supplier/Manufacturer may change the
          packaging/name/labels at any time according to their Will or approvals
          from the Govt.
          <br />
          <br />
          <b>18.4</b>Customer need to keenly overlook at the brand owner website
          or product label and ingredients to identify the product is same or
          not at the time of purchase. For more help, customer can communicate
          with support team. <br />
          <br />
          <b>18.5</b>Life Pharmacy will not be responsible for any change of
          product image or labels.
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          19. Delivery/Shipping/Service Policy
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          Life Pharmacy will NOT deal or provide any services or products to any
          of OFAC (Office of Foreign Assets Control) sanctions countries in
          accordance with the law of UAE
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          20. Refund/Return Policy
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          Refunds will be done only through the Original Mode of Payment{" "}
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          21. Governing Law and Jurisdiction{" "}
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          Any purchase, dispute or claim arising out of or in connection with
          this website shall be governed and construed in accordance with the
          laws of UAE{" "}
        </Typography>
      </div>
    </ModalContainer>
  );
};

export default TermsOfUseModal;
