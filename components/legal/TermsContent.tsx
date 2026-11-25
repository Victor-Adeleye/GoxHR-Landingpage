import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";

function MailLink() {
  return <a href="mailto:privacy@goxregister.com">privacy@goxregister.com</a>;
}

export function TermsContent() {
  return (
    <LegalDocument
      title="Terms of service"
      lede="These terms are the agreement for this website and for the GoxHR service. If you use GoxHR for a company, you confirm that you have authority to bind that company."
      summary={[
        {
          icon: "#i-mail",
          title: "A demo is not an order",
          text: "Sending the form asks us to arrange a conversation. It does not start a subscription or set a price.",
        },
        {
          icon: "#i-building",
          title: "The quote is the price",
          text: "Fees follow the headcount and the modules in the quote you accept. This page does not publish a rate card.",
        },
      ]}
      related={{ href: "/privacy", label: "Read the privacy policy" }}
      sections={[
        {
          id: "agreement",
          title: "Agreement to these terms",
          body: (
            <>
              <p>These terms apply to this website and to the GoxHR service you sign in to at <a href="https://portal.goxsuite.com/login" target="_blank" rel="noopener noreferrer">portal.goxsuite.com</a>. GoxHR is also known as Gox Register, and it is offered through Gox Suite. In these terms, GoxHR, we, us, and our mean the operator of that service and of this website.</p>
              <p>You means the company that uses the service, and the person who accepts these terms for that company. If you only read the website or ask for a demo, the sections on the website and on demo requests apply straight away. The sections on the paid service apply once a subscription starts.</p>
              <p>By using the website, submitting the demo form, or signing in, you agree to these terms and to the <Link href="/privacy">privacy policy</Link>. These terms, together with the quote or order you accept, are the whole agreement about the service. They replace earlier discussions about the same subject. If a quote or order conflicts with these terms on price, the length of the subscription, or which modules are included, the quote or order controls on that point.</p>
              <p>If a court holds one part of these terms unenforceable, the rest stays in force.</p>
            </>
          ),
        },
        {
          id: "the-service",
          title: "The service",
          body: (
            <>
              <p>GoxHR gives a company one place for employee records, attendance and clock-in, leave, documents, recruitment, performance reviews, announcements, and policy acknowledgements. Employees can use self-service on the web. Administrators run the service from the dashboard.</p>
              <p>Payroll draws on the employee and attendance records already kept in GoxHR, and it is rolling out. It is part of your service only when the quote says so, or when we confirm the timing for your company. The iOS and Android apps are in testing. They are not part of the service until we release them. Until then, employees use GoxHR on the web.</p>
              <p>We may improve screens and workflows as the product develops. We will not withdraw a module you are paying for without the notice in section 13, unless we must do so to protect the service or to meet the law.</p>
            </>
          ),
        },
        {
          id: "accounts",
          title: "Accounts and access",
          body: (
            <>
              <p>You import your people from a spreadsheet or add them one at a time, then invite them by email to set a password and sign in. You are responsible for the accuracy of what you upload, for who you invite, and for the roles you assign.</p>
              <p>Roles such as HR admin, line manager, and finance decide who can view and edit each part of a record. You must keep passwords confidential. Where the service offers two-factor sign-in, turn it on for administrators. Tell us promptly at <MailLink /> if you believe an account has been misused.</p>
              <p>We may suspend access if we reasonably believe it is being used in breach of these terms, or in a way that puts personal information at risk. We will tell you when we suspend access, unless the law stops us or telling you would increase the risk. You may ask us to review the suspension by writing to <MailLink />.</p>
            </>
          ),
        },
        {
          id: "customer-data",
          title: "Customer data",
          body: (
            <>
              <p>You keep all rights in the employee, applicant, and company information you put into GoxHR. You give us permission to host, back up, and display that information only so we can provide the service, keep it secure, and meet the law.</p>
              <p>You confirm that you have a lawful basis to upload it, including a basis under the Nigeria Data Protection Act 2023 where that Act applies, and that you have given your people the notice the law requires. For workforce records, you are the data controller and we are the processor. We follow your instructions, which are these terms, the privacy policy, and the settings and roles you choose in the product.</p>
              <p>We will not sell customer data, and we will not use it to advertise to your employees. We will not use it to train a public model. When the subscription ends, section 11 explains export and deletion.</p>
            </>
          ),
        },
        {
          id: "acceptable-use",
          title: "Acceptable use",
          body: (
            <>
              <p>You will not, and you will not allow your users to:</p>
              <ul>
                <li>Upload information you have no right to process.</li>
                <li>Use the service to break Nigerian law, or another law that applies to you.</li>
                <li>Try to bypass sign-in, two-factor sign-in, or role-based access.</li>
                <li>Probe, scan, or test the service for a weakness, except where we agree in writing.</li>
                <li>Interfere with the service, or with data that belongs to another customer.</li>
                <li>Resell the service, or present the software as your own product.</li>
              </ul>
              <p>We may remove content that breaches this section, and we may suspend the account as section 3 describes. A suspension of this kind does not, by itself, delete your data.</p>
            </>
          ),
        },
        {
          id: "demos",
          title: "Demo requests",
          body: (
            <>
              <p>The form on this website asks for your full name, work email, and company size. Sending it asks us to contact you about a demo. It does not create a subscription, a price, or a duty to buy.</p>
              <p>We use those details only as the privacy policy describes. A conversation on a demo does not change these terms. A change to price, term, or modules is binding only when it is in a quote or order you accept.</p>
            </>
          ),
        },
        {
          id: "fees",
          title: "Fees",
          body: (
            <>
              <p>There is no single public price. We quote from your headcount and the modules you need. You pay the fees, in the currency, stated on the quote or order you accept. The quote states what is included, including whether payroll is in scope for your company.</p>
              <p>Taxes that the law adds are extra unless the quote says they are included. If a fee is overdue, we may suspend the service after we write to the work email we hold for the account and give you a reasonable time to pay. Suspension for non-payment does not erase your data. Access returns when the overdue amount is paid, unless the subscription has already ended under section 11.</p>
            </>
          ),
        },
        {
          id: "intellectual-property",
          title: "Intellectual property",
          body: (
            <>
              <p>We own the GoxHR software, the design of this website, and the GoxHR name and logo. These terms do not transfer that ownership. You receive a right to use the service for your internal HR operations during a paid subscription. That right is not exclusive, and you may not transfer it.</p>
              <p>You may not copy the software, reverse engineer it except where the law does not allow this limit, or use our brand except to say that you use GoxHR. You own your data, as section 4 says. Feedback you choose to give us may be used to improve the service, with no duty to pay for that feedback.</p>
            </>
          ),
        },
        {
          id: "confidentiality",
          title: "Confidentiality",
          body: (
            <>
              <p>We will keep customer data confidential. Access inside GoxHR is limited to the roles you set, and to people who need the information to provide the service, secure it, or meet the law.</p>
              <p>You will keep confidential any non-public information we give you about the product, a quote, or security. This duty does not cover information that is already public through no fault of the receiving side, or that the law requires to be disclosed. If the law requires a disclosure, the side disclosing it will tell the other beforehand where the law allows.</p>
              <p>This section continues after the service ends.</p>
            </>
          ),
        },
        {
          id: "availability",
          title: "Service availability",
          body: (
            <>
              <p>We provide GoxHR with reasonable care, and as this website and your quote describe it. This page does not promise a specific uptime percentage. The service may be interrupted for maintenance, for a failure of a provider we rely on, or during a security incident. We will work to restore it and, where a planned interruption is long enough to matter, we will give notice to the administrator email we hold.</p>
              <p>Payroll remains subject to the rollout described on this website. Mobile apps are not available until we release them. The words on this website are a description of the product, not a warranty that every future screen will match a particular picture. A demo does not add a warranty.</p>
            </>
          ),
        },
        {
          id: "ending",
          title: "Ending the service",
          body: (
            <>
              <p>You may stop at the end of the period your quote describes by writing to <MailLink />.</p>
              <p>We may end or suspend the service if you materially breach these terms and do not fix the breach within a reasonable time after we write to you. We may end it immediately if the breach is unlawful handling of personal information, or a threat to the security of the service.</p>
              <p>When the subscription ends, ask us for an export of your customer data and we will provide it in a structured file the service can produce. Ask before the subscription ends, or within a reasonable time after it ends. After we provide the export, or after that reasonable time if you do not ask, we delete customer data, except what we must keep for a dispute or a legal duty. The privacy policy describes that retention.</p>
              <p>Sections that should live on after the service ends continue, including customer data, confidentiality, liability, and governing law. Fees already due remain due.</p>
            </>
          ),
        },
        {
          id: "liability",
          title: "Liability",
          body: (
            <>
              <p>Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for any duty under the Nigeria Data Protection Act 2023 that the Act does not allow a contract to exclude.</p>
              <p>Subject to that, neither side is liable to the other for indirect or consequential loss, or for lost profits, lost revenue, lost savings, or lost goodwill, even if advised that the loss was possible.</p>
              <p>Subject to the first paragraph of this section, the total liability of each side arising out of the service in any period of 12 months is limited to the fees you actually paid us for the service during the 12 months before the claim. If you have not paid fees, because you have only used the website or asked for a demo, our liability for that use is limited to direct loss that was reasonably foreseeable when you used the website.</p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to these terms",
          body: (
            <>
              <p>We may update these terms by posting the new version on this page and changing the effective date. The version you are reading is effective 12 October 2026.</p>
              <p>If you have a subscription and a change is material, we will also email the administrator address we hold before the change takes effect. If you do not agree, you may end the service under section 11 before the change applies. Continuing to use the service after the effective date means you accept the update. A quote already accepted keeps the price, length, and modules it states, as section 1 describes.</p>
            </>
          ),
        },
        {
          id: "law",
          title: "Law and disputes",
          body: (
            <>
              <p>These terms are governed by the laws of the Federal Republic of Nigeria. The courts of Nigeria have exclusive jurisdiction over disputes arising out of these terms or the service.</p>
              <p>Either side may still seek urgent injunctive relief from any court that can grant it, including to protect confidential information or to stop misuse of the service. Before starting a claim, write to <MailLink /> and give the other side a reasonable time to respond. That step is not required where waiting would cause serious harm.</p>
            </>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <>
              <p>Notices under these terms go to <MailLink />. Use a subject line that says the notice is about these terms, and include the company name on the account.</p>
              <p>
                To talk to sales, use the demo form on the <Link href="/#demo">homepage</Link>. Sign in at{" "}
                <a href="https://portal.goxsuite.com/login" target="_blank" rel="noopener noreferrer">portal.goxsuite.com</a>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
