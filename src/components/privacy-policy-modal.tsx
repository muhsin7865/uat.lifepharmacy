import ModalContainer from "./ui/modal-container";
import { Typography } from "./ui/typography";
import { Icon } from "./ui/icons";
import { useModal } from "./ui/modalcontext";
import { Button } from "./ui/button";

const PrivacyPolicyModal = () => {
  const { setPrivacyPolicyModalState, PrivacyPolicyModalState } = useModal();

  return (
    <ModalContainer
      size={"lg"}
      showModal={PrivacyPolicyModalState}
      setCloseModal={setPrivacyPolicyModalState}
    >
      <div className=" flex justify-between  font-semibold  mb-2">
        <Typography size={"xxl"} bold={"bold"}>
          Privacy Policy
        </Typography>
        <Button
          variant={"closeBtn"}
          size={"sm"}
          rounded={"full"}
          onClick={() => {
            setPrivacyPolicyModalState(false);
          }}
        >
          <Icon type="crossIcon" />
        </Button>
      </div>
      <div className="space-y-3 overflow-y-auto h-[30rem]   my-4">
        <Typography variant={"paragraph"} size={"sm"}>
          The following Privacy Policy applies only to Lifepharmacy.com (the
          “Website”),Life pharmacy Mobile Apps ("Android" and "IOS") and
          information provided by you or otherwise collected online through this
          website or mobile apps.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          Absolute Confidentiality
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          www.lifepharmacy.com (also referred to as " lifepharmacy " or
          "Website" or "We") is totally committed to protecting your privacy and
          ensuring the security of any personal information received from you
          ("Customer"). At lifepharmacy, the confidentiality of our Customers is
          a top priority.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          Your Consent
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>2.1</b> By accessing this Website/APP and whenever you submit any
          information to Lifepharmacy.com, or use products and services offered
          by our Website, you agree to be bound by the terms of this Privacy
          Policy. Please read below carefully the entire Privacy Policy before
          using Lifepharmacy.com website:
          <br />
          <br />
          <b>2.2</b>As part of providing our Services to you, we may need to
          send routine communications to you, such as order transaction emails
          and other administrative messages through email and notifications
          posted on the Website or through other means available, including text
          and other forms of messaging. Though we prefer to communicate with our
          Customers via email, as may be deemed necessary, you agree to receive
          our phone calls, related to your orders/request on Lifepharmacy.com.
          <br />
          <br />
          <b>2.3</b> When you sign up to receive our e-newsletters, we may
          periodically send emails about new products, special offers or other
          information, which you may find it interesting and beneficial as well.
          If you do not wish to receive promotional information from us, you
          can, at any time, choose to opt out of receiving Lifepharmacy
          promotional e-newsletters. To unsubscribe from our e-newsletters, you
          can follow the directions included at the e-newsletter.
          <br />
          <br />
          <b>2.4</b> You must ensure to provide us with the correct or
          up-to-date Personal Information. This will allow us to contact you for
          further correspondences with respect to your order at
          Lifepharmacy.com. We are not responsible for any inaccurate
          information you provide to us, which may affect your shopping
          experience on our website.
          <br />
          <br />
          <b>2.5</b> If, at any time, you want to access, update, modify or
          eliminate any of your account information at Lifepharmacy.com, you may
          do so by clicking "Your Account", and then review/change your
          sensitive personal information as you want it to be.
          <br />
          <br />
          <b>2.6</b> Lifepharmacy.com may, in future, request other optional
          information from you in order to customize the Website to deliver
          personalized service to our Customers.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          What Information We Collect About You
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>3.1</b> We do not automatically collect your personally
          identifiable information. However, you might provide us with your
          personal and demographic information – including your name, gender,
          age, address, phone number, email address and your medical
          prescription(s) – in the following ways: As a New Customer, when you
          register/create an account, place your order, or upload your medical
          prescription at Lifepharmacy.com; As an Existing Customer, when you
          update your existing profile on Lifepharmacy.com; When you sign up for
          enewsletters at Lifepharmacy.com; When you use Refer & Earn programme,
          Ask Our Pharmacist service, Contact Us or submit your Testimonials at
          Lifepharmacy.com.
          <br />
          <br />
          <b>3.2</b> During your visit to our Website, we may automatically
          receive technical information about your computer/device, including
          your IP address, your computer operating system, time-zone, browser
          type and browser plug-in details, due to the communication protocol
          settings on the Internet. <br />
          <br />
          <b>3.3</b>When you browse our Website, we may also collect information
          regarding the pages you viewed, the web addresses from which you
          arrive or click through to, time spent on certain pages, download
          errors and page response times. All these information help us analyze
          Customers' trends and preferences, and thus assist us in improving our
          service.
        </Typography>
        <Typography variant={"primary"} bold={"semibold"}>
          How We Use the Information Collected from You
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>4.1</b> We will collect and retain your personally identifiable
          information only to the extent that it is necessary to fulfil our
          services to you. Any Personal information submitted by you to the
          Website or collected by us will be used ONLY for the purposes
          mentioned below:
          <br />
          <br />
          <b>4.1.1</b> To carry out our obligations arising from your requests
          for our products and services; <br />
          <br />
          <b>4.1.2</b> To improve our Website's functionality, and to customize
          your future shopping experience with us;
          <br />
          <br />
          <b>4.1.3</b>To make sure that our Website content is presented in the
          manner that is most effective for you;
          <br />
          <br />
          <b>4.1.4</b> To communicate with you about any changes to our
          services;
          <br />
          <br />
          <b>4.1.5</b> To verify your identity and perform checks to prevent
          fraud.
          <br />
          <br />
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          With Whom We Share Your Information
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>5.1</b> We do not sell, rent or exchange your any personally
          identifiable information that you provide to us through this Website
          with any third party for commercial reasons. However, we engage
          trusted online payment service partners to perform payment processing
          and authorization services (for net banking or credit/debit card
          validation). Through your use of the Lifepharmacy.com Services, you
          consent to our collection and transfer of your information to our
          payment service partner websites.
          <br />
          <br />
          <b>5.2</b>As with any business, it is possible that as our business
          develops, we might sell or buy other businesses or assets. In such
          transactions, User/Customer information is typically one of the
          transferred business assets. Accordingly, in the event that
          Lifepharmacy.com, or substantially all of our assets, is acquired by a
          third party, such information may be one of the assets that is
          transferred or acquired by a third party. Under such circumstances,
          Lifepharmacy.com would, to the extent possible, require the acquiring
          party to follow the practices described in this Privacy Policy. You
          acknowledge that such transfers may occur, and that any acquirer of
          Lifepharmacy.com may continue to process your personal information as
          set forth in this Privacy Policy.
          <br />
          <br />
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          Who Has Access to Your Information
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          Your personally identifiable information can be accessed only on a
          need-to-know basis by certain Lifepharmacy.com employees who are
          designated to carry out your requested activity, and all such
          employees are bound to strict confidentiality obligations.
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          How We Use Cookies{" "}
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          <b>7.1</b>"Cookies" are small pieces of information placed by a
          website onto your computer's hard drive. Cookies do not collect any
          sensitive personal information from you. We use cookies to analyze
          data about our web page traffic, which helps us save your preferences
          for your future visits. This allows us to customize our website
          according to your interests, which will enable us to deliver a more
          personalized service to our customers. You may choose to accept or
          decline cookies. Please be aware that by declining cookies you may be
          unable to use our website to its fullest capability.
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          Security Policy{" "}
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          We guarantee that all your personal information with us is secure.
          Lifepharmacy.com takes careful precaution to protect our Customers'
          personal information from unauthorized access, improper use or
          disclosure or unauthorized modification. To prevent unauthorized
          access, we have put in place the latest industry-standard security
          technology and procedures to safeguard the information we collect
          online. Your personal information is encrypted and is protected with
          Secure Sockets Layer (SSL) software, which encrypts all information
          you input. We store your personally identifiable information on the
          computer servers placed in a secure environment. Even though we have
          taken significant steps to protect your personally identifiable
          information, no company, including our Website, can fully eliminate
          security risks associated with Personal Information.{" "}
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          Maintain Confidentiality of Your Prescription
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          We understand the confidential nature of the prescription you provide
          us to process your medication order and we treat your prescription as
          a protected information.
        </Typography>

        <Typography variant={"primary"} bold={"semibold"}>
          Changes to Our Privacy Policy
        </Typography>
        <Typography variant={"paragraph"} size={"sm"}>
          We may revise this Privacy Policy from time to time by updating this
          page, and so we urge you to review it periodically to ensure that you
          agree with any such changes that we make. We will make best efforts to
          inform you of any important amendments by e-mail, message on the
          Website or notification in Your Account. However, it is your
          responsibility to check the Policy regularly to ensure that you agree
          with it and your continued use of the Website will be deemed to be
          your acceptance of any changes that we make.{" "}
        </Typography>
      </div>
    </ModalContainer>
  );
};

export default PrivacyPolicyModal;
