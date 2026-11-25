import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";

function MailLink() {
  return <a href="mailto:privacy@goxregister.com">privacy@goxregister.com</a>;
}

export function PrivacyContent() {
  return (
    <LegalDocument
      title="Privacy policy"
      lede="This notice explains what personal information GoxHR collects on this website and in the service, why we use it, who we share it with, and the choices you have under the Nigeria Data Protection Act 2023."
      summary={[
        {
          icon: "#i-shield",
          title: "We do not sell personal information",
          text: "We do not rent it, and we do not use employee records to advertise to your people.",
        },
        {
          icon: "#i-role",
          title: "The employer controls workforce records",
          text: "If a record sits in a company account, ask that company first. Contact us about this website and about demo requests.",
        },
      ]}
      related={{ href: "/terms", label: "Read the terms of service" }}
      sections={[
        {
          id: "who-this-covers",
          title: "Who this notice covers",
          body: (
            <>
              <p>This notice is for four groups of people:</p>
              <ul>
                <li>Visitors to this website.</li>
                <li>People who send a demo request from the form on this website.</li>
                <li>Administrators and other users a customer invites to sign in at portal.goxsuite.com.</li>
                <li>Employees, former employees, and applicants whose information a customer stores in GoxHR.</li>
              </ul>
              <p>If you are in the last group, your employer decides what is collected about your work and why. Read section 3 before you write to us about a record in a company account.</p>
            </>
          ),
        },
        {
          id: "who-we-are",
          title: "Who we are",
          body: (
            <>
              <p>GoxHR is the HR service described on this website: employee records, attendance, leave, payroll as it rolls out, recruitment, documents, performance reviews, announcements, and policy acknowledgements, with self-service for employees on the web.</p>
              <p>The same service is also known as Gox Register, and it is offered through Gox Suite. You sign in at <a href="https://portal.goxsuite.com/login" target="_blank" rel="noopener noreferrer">portal.goxsuite.com</a>. In this notice, GoxHR, we, us, and our mean the operator of that service and of this website.</p>
              <p>This notice is written for the Nigeria Data Protection Act 2023. The Nigeria Data Protection Commission oversees that Act. Questions about this notice go to <MailLink />.</p>
            </>
          ),
        },
        {
          id: "roles",
          title: "Our role and the employer role",
          body: (
            <>
              <p>When a company uses GoxHR to keep workforce information, that company decides what is collected and the purpose. The company is the data controller for employee records, attendance, leave, payroll, recruitment, documents, performance reviews, announcements, requests, and policy acknowledgements stored in its account. GoxHR processes that information on the company instructions so the service can run. We are the data processor for that information.</p>
              <p>When you browse this website or send a demo request, GoxHR decides the purposes. We are the data controller for that information.</p>
              <p>If you are an employee, a former employee, or an applicant, contact the employer first about a record in their account. Write to <MailLink /> when the request is about this website, a demo request, or other processing for which GoxHR is the controller. If a request about a company account needs our help to complete, we will assist that company.</p>
            </>
          ),
        },
        {
          id: "information-we-collect",
          title: "Information we collect",
          body: (
            <>
              <h3>On this website</h3>
              <p>The demo form asks for three things: your full name, your work email, and your company size. We use them to reply and to arrange a demo. The form does not ask for anything else.</p>
              <p>This website stores one preference on your device, in local storage, under the key goxhr-theme. It remembers whether you chose a light or dark theme. It stays in your browser. This website does not load an advertising tag or a third-party analytics script, and it does not set a tracking cookie.</p>
              <h3>In the service</h3>
              <p>A customer, and the people that customer invites, may store the following. We collect it from the customer and from those people. We do not buy personal information.</p>
              <ul>
                <li>Account details: name, email, the password set when an invite is accepted, and a second sign-in step when two-factor sign-in is turned on.</li>
                <li>Employee profile: bio data, next of kin, bank details, qualifications, experience, job title, department, start date, manager, documents such as contracts and identity records, and an indication of what is still missing from the profile.</li>
                <li>Attendance: clock-in and clock-out times, and the status that follows from them, such as on time, late, overtime, or absent.</li>
                <li>Leave: the type of request, the dates, the balance, and the approval decision. A type such as sick leave can reveal health information. The employer is responsible for having a lawful basis for that information. Only roles the employer allows can see it.</li>
                <li>Payroll, when that module is in use for the company: salary, deductions, net pay, and payslips. Payroll is rolling out, so a company does not have this module until we confirm it.</li>
                <li>Recruitment: applicant details and the stage of an application, from applied through to hired.</li>
                <li>Performance: goals, self-assessments, progress, and ratings.</li>
                <li>Requests an employee raises, such as IT support, documents, policy questions, and general HR.</li>
                <li>Announcements, and a record of who acknowledged a policy and when.</li>
                <li>The roles that decide who can view or edit each part of a record, such as HR admin, line manager, and finance.</li>
              </ul>
              <p>A next of kin stored on an employee profile may be under 18. That detail is part of the employee record the employer controls. This website does not ask children to create an account.</p>
            </>
          ),
        },
        {
          id: "how-we-use-it",
          title: "How we use information",
          body: (
            <>
              <p>We use personal information to:</p>
              <ul>
                <li>Provide the modules a customer has asked for, including records, attendance, leave, documents, recruitment, performance, announcements, policy acknowledgements, and payroll when it is in use.</li>
                <li>Invite people by email, let them set a password, and sign them in, including a second step when two-factor sign-in is on.</li>
                <li>Show each signed-in person only what their role allows.</li>
                <li>Reply to a demo request and arrange a call.</li>
                <li>Protect accounts and the service, and investigate misuse.</li>
                <li>Meet a legal duty, or establish or defend a legal claim.</li>
              </ul>
              <p>We do not sell personal information. We do not rent it. We do not use workforce records to advertise to employees, and we do not send those records to outside recruiters. Recruitment information stays inside the customer account, for the roles that customer has allowed.</p>
            </>
          ),
        },
        {
          id: "lawful-bases",
          title: "Why we are allowed to use it",
          body: (
            <>
              <p>The Nigeria Data Protection Act 2023 requires a lawful basis. Depending on the activity, we rely on one of these:</p>
              <ul>
                <li><strong>Contract.</strong> To provide the service a customer has asked for, and to take the steps a person asks for before a contract, such as replying to a demo request.</li>
                <li><strong>Legitimate interests.</strong> To keep the service secure, to limit access by role, and to keep this website reliable. We do not use this basis to sell information. Where we are the processor, the employer is responsible for its own basis, and our interest is limited to running the service as instructed.</li>
                <li><strong>Legal obligation.</strong> Where Nigerian law requires us to keep or disclose information.</li>
                <li><strong>Consent.</strong> Only where we ask for it as a separate choice. You can withdraw that consent later. Withdrawal does not affect processing that was already lawful.</li>
              </ul>
              <p>For workforce information, the employer chooses the basis that applies to its people. Our processing of that information follows the employer instructions and these purposes.</p>
            </>
          ),
        },
        {
          id: "sharing",
          title: "Who we share information with",
          body: (
            <>
              <p>We share personal information only in these cases:</p>
              <ul>
                <li><strong>Authorised users of the customer.</strong> HR admins, line managers, finance, and other roles the customer creates can see the parts of a record that the customer allows.</li>
                <li><strong>Providers who host and deliver the service.</strong> We engage providers to host the service and to send operational email, such as an invite or a reply to a demo request. We do not publish their names on this page. Email <MailLink /> and ask for the current list. We will send it.</li>
                <li><strong>A legal duty.</strong> We disclose information when Nigerian law, a court, or a competent authority requires it. We ask the authority to limit the request to what the law requires.</li>
                <li><strong>A transfer of the service.</strong> If the business that operates GoxHR is sold or merged, customer information may pass to the buyer so the service can continue. We will tell customers before that happens, unless the law stops us.</li>
              </ul>
              <p>We do not sell personal information. We do not rent it. We do not share it with advertisers.</p>
            </>
          ),
        },
        {
          id: "transfers",
          title: "International transfers",
          body: (
            <>
              <p>GoxHR is made for teams in Nigeria and beyond. Personal information may be processed in Nigeria and in other countries where the providers who host or support the service operate.</p>
              <p>Where information leaves Nigeria, we put in place the safeguards the Nigeria Data Protection Act 2023 requires. That includes a written contract that binds the recipient to protect the information and to use it only for the purpose we set. A customer can ask <MailLink /> for a summary of those safeguards.</p>
            </>
          ),
        },
        {
          id: "retention",
          title: "How long we keep information",
          body: (
            <>
              <p>We keep a demo request for as long as we need to answer it and to keep a short record of that conversation. We then delete it, unless we still need it for a legal claim.</p>
              <p>We keep workforce information in a customer account for as long as the subscription is active. After the subscription ends, the customer can ask for an export, as the terms of service describe. We then delete that information, or return it, except where we still need it to resolve a dispute or to meet a legal duty. We do not keep workforce records for a later sales campaign.</p>
              <p>The theme preference under goxhr-theme stays on your device until you clear site data for this website. We do not hold a copy of it.</p>
            </>
          ),
        },
        {
          id: "security",
          title: "How we protect information",
          body: (
            <>
              <p>HR records are sensitive. GoxHR is built so a customer can limit who sees them.</p>
              <ul>
                <li>Every account can require a second step at sign-in, so a stolen password is not enough.</li>
                <li>The customer creates roles, such as HR admin, line manager, and finance, and decides what each role can view and edit.</li>
                <li>Policy acknowledgements are stored per employee, so the customer can see who accepted a policy and when.</li>
              </ul>
              <p>No method of transmission or storage is perfectly secure. If you believe an account has been misused, tell the customer administrator and email <MailLink />. We will look into reports that reach us about the service.</p>
            </>
          ),
        },
        {
          id: "rights",
          title: "Your rights",
          body: (
            <>
              <p>Under the Nigeria Data Protection Act 2023, you can ask to:</p>
              <ul>
                <li>Access the personal information held about you.</li>
                <li>Correct information that is inaccurate or incomplete.</li>
                <li>Delete information, in the cases the Act allows.</li>
                <li>Restrict processing, in the cases the Act allows.</li>
                <li>Receive a copy in a portable form, where the Act gives that right.</li>
                <li>Object to processing that is based on legitimate interests.</li>
                <li>Withdraw consent, where processing is based on consent.</li>
              </ul>
              <p>GoxHR does not decide employment outcomes by automated means alone. Approving leave, moving an applicant, and rating performance are decisions the customer users make in the product.</p>
              <p>To use a right with us, email <MailLink />. Tell us what you are asking for and the email address tied to the request, so we can confirm who you are. We will respond within the time the Act allows. If the information sits in a customer account, we will usually direct you to that customer, because they decide what happens to those records. We will help them where the request needs action from us.</p>
              <p>You can also complain to the Nigeria Data Protection Commission at <a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer">ndpc.gov.ng</a>. We would like the chance to look at the concern first. Write to <MailLink /> and we will reply.</p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies and on-device storage",
          body: (
            <>
              <p>This marketing website does not set an advertising cookie and does not load a third-party analytics script. The only preference it stores is the theme choice in local storage, under the key goxhr-theme. You can remove it by clearing site data for this website in your browser. The page will then follow your device theme until you choose again.</p>
              <p>The signed-in service at portal.goxsuite.com may store what it needs to keep you signed in. That storage belongs to the service, not to this marketing website. It is used to recognise the session, not to advertise.</p>
            </>
          ),
        },
        {
          id: "children",
          title: "Children",
          body: (
            <>
              <p>GoxHR is a workplace service for companies and their people. It is not directed at children, and this website does not invite children to create an account or to send a demo request.</p>
              <p>An employer may store a next of kin who is under 18 as part of an adult employee record. That information is workforce data the employer controls. We process it only so the employee profile can be kept, and only for the roles the employer allows.</p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to this notice",
          body: (
            <>
              <p>We post changes on this page and update the effective date at the top. The version you are reading is effective 12 October 2026.</p>
              <p>If a change materially affects information for which GoxHR is the controller, we will also say so on this page before the change takes effect, where the Act requires notice. For workforce information the employer controls, the employer is responsible for telling its people about changes in how that company uses the service.</p>
            </>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <>
              <p>Email <MailLink /> for privacy questions, requests to use the rights in section 11, and complaints about processing for which GoxHR is the controller.</p>
              <p>To talk to sales, use the demo form on the <Link href="/#demo">homepage</Link>.</p>
            </>
          ),
        },
      ]}
    />
  );
}
