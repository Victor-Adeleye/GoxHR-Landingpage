"use client";

/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconSprite } from "@/components/IconSprite";
import GetStartedModal from "@/components/GetStartedModal";
import { initLanding } from "@/lib/initLanding";

const DEMO_URL = "https://calendly.com/jamesjanep055/lulisuite";

export default function LandingPage() {
  const [getStartedOpen, setGetStartedOpen] = useState(false);

  // Opens the Get Started popup; also closes the mobile menu if it was open.
  const openGetStarted = () => {
    document.getElementById("mobileMenu")?.classList.remove("open");
    document.getElementById("menuBtn")?.setAttribute("aria-expanded", "false");
    setGetStartedOpen(true);
  };

  useEffect(() => {
    const controller = new AbortController();
    initLanding(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <>
      <IconSprite />
<header className="nav" id="nav">
  <div className="wrap">
    <a className="logo" href="#top" aria-label="GoxHR home">
      <svg className="brand" viewBox="0 0 930.76 210.59" aria-hidden="true"><use href="#goxhr-logo" /></svg>
    </a>
    <nav className="nav-links" aria-label="Main">
      <a href="#product">Product</a>
      <a href="#hr">For HR teams</a>
      <a href="#employees">For employees</a>
      <a href="#sales">Pricing</a>
      <a href="#faq">FAQ</a>
    </nav>
    <div className="nav-end">
      <button className="theme-btn" type="button" data-theme-toggle="" aria-label="Switch to dark theme"><svg className="icon i-moon"><use href="#i-moon" /></svg><svg className="icon i-sun"><use href="#i-sun" /></svg></button>
      <button className="btn btn-ghost btn-sm nav-gs" type="button" onClick={openGetStarted}>Get Started</button>
      <a className="btn btn-primary btn-sm" href={DEMO_URL} target="_blank" rel="noopener noreferrer">Book a demo</a>
      <button className="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open menu"><svg className="icon"><use href="#i-more" /></svg></button>
    </div>
  </div>
  <div className="mobile-menu" id="mobileMenu">
    <a href="#product">Product</a><a href="#hr">For HR teams</a><a href="#employees">For employees</a><a href="#sales">Pricing</a><a href="#faq">FAQ</a><button className="mobile-cta" type="button" onClick={openGetStarted}>Get Started</button>
    <button className="mobile-theme" type="button" data-theme-toggle="" aria-label="Switch to dark theme"><svg className="icon i-moon"><use href="#i-moon" /></svg><svg className="icon i-sun"><use href="#i-sun" /></svg><span>Dark mode</span></button>
  </div>
</header>

<main id="top">
{/* ================= HERO ================= */}
<section className="hero">
  <div className="wrap hero-center">
    <h1>Run your whole workforce from one dashboard.</h1>
    <p className="lede">GoxHR gives HR teams one place for employee records, attendance, leave and payroll. Your people handle their own requests, so you spend less time chasing.</p>
    <div className="ctas">
      <a className="btn btn-primary" href={DEMO_URL} target="_blank" rel="noopener noreferrer">Book a demo</a>
      <a className="btn btn-ghost" href="#hr">See how it works</a>
    </div>
    <div className="assure">
      <span><svg className="icon"><use href="#i-lock" /></svg>Two-factor sign-in</span>
      <span><svg className="icon"><use href="#i-role" /></svg>Role-based access</span>
      <span><svg className="icon"><use href="#i-building" /></svg>For teams of any size</span>
    </div>
  </div>

  <div className="dash-wrap">
    <div className="dash-frame">
      <div className="dash-bar" aria-hidden="true"><i></i><i></i><i></i><span>app.goxhr.com/admin/dashboard</span></div>
      <div className="dash-scale" id="dashScale" role="img" aria-label="GoxHR admin dashboard showing 320 employees, 304 present today, 8 on leave, total salary of 28.49 million naira, headcount by department, attendance trend, salary spread and employment type">
        <div className="dash" id="dash" aria-hidden="true">
          <aside className="d-side">
            <div className="d-logo"><svg className="brand brand-alt" viewBox="0 0 930.76 210.59" aria-hidden="true"><use href="#goxhr-logo" /></svg><em>Admin</em></div>
            <nav className="d-nav" id="dNav"><a className="on"><svg className="icon"><use href="#i-grid" /></svg>Dashboard</a><a><svg className="icon"><use href="#i-users" /></svg>Employees</a><a><svg className="icon"><use href="#i-clip" /></svg>Attendance</a><a><svg className="icon"><use href="#i-wallet" /></svg>Payroll</a><a><svg className="icon"><use href="#i-cal" /></svg>Leave management</a><a><svg className="icon"><use href="#i-brief" /></svg>Recruitment</a><a><svg className="icon"><use href="#i-doc" /></svg>Documents</a><a><svg className="icon"><use href="#i-role" /></svg>Administration</a><a><svg className="icon"><use href="#i-gear" /></svg>Settings</a></nav>
            <a className="d-logout"><svg className="icon"><use href="#i-logout" /></svg>Log out</a>
          </aside>
          <div className="d-main">
            <header className="d-head"><h4>Dashboard</h4><div className="d-head-r"><span className="d-bell"><svg className="icon"><use href="#i-bell" /></svg></span><span className="d-sep"></span><span className="d-av">JO</span></div></header>
            <h3 className="d-greet">Good morning, Jackson</h3>
            <div className="d-kpis">
              <div className="d-kpi"><b data-count="320">320</b><span><i><svg className="icon"><use href="#i-users" /></svg></i>Total employees</span></div>
              <div className="d-kpi"><b data-count="304">304</b><em>Today</em><span><i><svg className="icon"><use href="#i-role" /></svg></i>Employees present</span></div>
              <div className="d-kpi"><b data-count="8">8</b><em>This month</em><span><i><svg className="icon"><use href="#i-cal" /></svg></i>Employees on leave</span></div>
              <div className="d-kpi"><b data-count="28490000.75" data-money="">₦28,490,000.75</b><span><i><svg className="icon"><use href="#i-wallet" /></svg></i>Total salary</span></div>
            </div>
            <div className="d-row2">
              <div className="d-card d-dept">
                <div className="d-card-h"><h5>Total employee by department</h5><div className="d-legend"><span><i style={{background:'#3E8E7B'}}></i>Count</span><span><i style={{background:'#F6DFB0'}}></i>Male</span><span><i style={{background:'#FFC9C9'}}></i>Female</span></div></div>
                <div className="d-plot" id="deptPlot"></div>
                <div className="d-tip" id="deptTip"></div>
              </div>
              <div className="d-card d-att">
                <div className="d-card-h"><h5>Attendance trend</h5><button className="d-select" id="attSel" aria-expanded="false" tabIndex={-1}><svg className="icon"><use href="#i-cal" /></svg><span id="attSelLabel">Today</span><svg className="icon chev"><use href="#i-chev" /></svg></button></div>
                <div className="d-menu" id="attMenu"><button data-k="today" className="on" tabIndex={-1}>Today</button><button data-k="week" tabIndex={-1}>This week</button><button data-k="month" tabIndex={-1}>This month</button></div>
                <div className="d-plot" id="attPlot" style={{left:'66px'}}></div>
                <div className="d-tip sm" id="attTip"></div>
              </div>
            </div>
            <div className="d-row3">
              <div className="d-card d-sal">
                <div className="d-card-h"><h5>Salary spread</h5></div>
                <svg className="d-donut-svg" id="salSvg" viewBox="0 0 416 250" width="416" height="250"></svg>
                <div className="d-sal-legend" id="salLegend"></div>
              </div>
              <div className="d-card d-emp">
                <div className="d-card-h"><h5>Employment type</h5></div>
                <svg className="d-donut-svg" id="empSvg" viewBox="0 0 630 392" width="630" height="392"></svg>
                <ul className="d-emp-legend" id="empLegend"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= LOGO STRIP ================= */}
<section className="trust" aria-labelledby="trustLabel">
  <div className="wrap trust-in">
    <p className="trust-label" id="trustLabel">Trusted by leading companies</p>
    <div className="marq">
      <div className="marq-track">
        <div className="marq-set">
          <img src="/logos/luli-fiber.png" alt="Luli Fiber" className="is-globe" width="50" height="44" />
          <img src="/logos/lulisuite.png" alt="LuliSuite" width="130" height="32" />
          <img src="/logos/lulitech.png" alt="Lulitech" width="176" height="32" />
          <img src="/logos/lulichat.png" alt="Lulichat" width="133" height="32" />
          <img src="/logos/lulisign.png" alt="Lulisign" width="129" height="32" />
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= FACTS STRIP ================= */}
<section className="facts" id="product" aria-label="What GoxHR covers">
  <div className="wrap">
    <div className="fact"><svg className="icon"><use href="#i-users" /></svg><div><b>One employee record</b><span>Bio data, next of kin, salary and documents together</span></div></div>
    <div className="fact"><svg className="icon"><use href="#i-clock" /></svg><div><b>Attendance and clock-in</b><span>See who's in, late or out, as it happens</span></div></div>
    <div className="fact"><svg className="icon"><use href="#i-cal" /></svg><div><b>Leave in one queue</b><span>Requests, balances and approvals in one place</span></div></div>
    <div className="fact"><svg className="icon"><use href="#i-phone" /></svg><div><b>An app for your people</b><span>Self-service on web today, mobile soon</span></div></div>
  </div>
</section>

{/* ================= OLD WAY vs NEW ================= */}
<section className="sec">
  <div className="wrap">
    <div className="sec-head sec-head-c">
      <h2>Your HR shouldn't live in five different places.</h2>
      <p>Most HR teams stitch the job together from registers, spreadsheets and group chats. GoxHR replaces each of them with one connected system.</p>
    </div>
    <div className="ledger">
      <div className="ledger-card is-old">
        <div className="ledger-card-h"><h3>Without GoxHR</h3><span className="ledger-tag">The old way</span></div>
        <ul className="ledger-list">
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-x" /></svg></span><p><b>Paper registers:</b> attendance starts as a signature at the front desk and gets typed up later.</p></li>
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-x" /></svg></span><p><b>Leave in group chats:</b> requests sit in WhatsApp and balances live in a separate sheet.</p></li>
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-x" /></svg></span><p><b>Payroll by hand:</b> the same spreadsheet is rebuilt from scratch every month.</p></li>
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-x" /></svg></span><p><b>Documents by email:</b> contracts and IDs are chased one reply at a time.</p></li>
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-x" /></svg></span><p><b>Noticeboard notices:</b> announcements only reach whoever walks past them.</p></li>
        </ul>
      </div>
      <div className="ledger-card is-new">
        <div className="ledger-card-h"><h3>With GoxHR</h3><span className="ledger-tag">The new way</span></div>
        <ul className="ledger-list">
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-check" /></svg></span><p><b>Clock-in that counts:</b> staff clock in on web or phone and your dashboard updates live.</p></li>
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-check" /></svg></span><p><b>One approval queue:</b> every request shows the balance it draws from, right beside it.</p></li>
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-check" /></svg></span><p><b>Payroll on real records:</b> built on the same employee and attendance data. <span className="ledger-pill">Rolling out</span></p></li>
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-check" /></svg></span><p><b>Documents employees own:</b> they upload theirs, and you see what is still missing.</p></li>
          <li><span className="ledger-mark"><svg className="icon"><use href="#i-check" /></svg></span><p><b>Announcements that land:</b> one post reaches everyone, with a record of who acknowledged it.</p></li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* ================= PILLAR 1: WORKFORCE AT A GLANCE ================= */}
<section className="sec" id="hr">
  <div className="wrap split">
    <div className="split-copy">
      <span className="kicker">For HR teams</span>
      <h2>Your workforce at a glance.</h2>
      <p className="muted" style={{fontSize:'18px',marginTop:'16px'}}>Headcount, attendance, leave and salary spread on one screen, so you can answer the MD's questions without opening a spreadsheet.</p>
      <ul className="points">
        <li><svg className="icon"><use href="#i-check" /></svg><span><b>Headcount by department</b> and employment type, always current.</span></li>
        <li><svg className="icon"><use href="#i-check" /></svg><span><b>Who's out this week</b> and why, before anyone asks.</span></li>
        <li><svg className="icon"><use href="#i-check" /></svg><span><b>Salary spread</b> across bands, for planning and budgeting.</span></li>
      </ul>
    </div>
    <div className="board" aria-label="Workforce overview preview">
      <div className="panel tall">
        <div className="panel-t">Headcount by department <span>144 people</span></div>
        <div className="dept">
          <div><span>Operations</span><i style={{width:'100%'}}></i><em>38</em></div>
          <div><span>Customer care</span><i style={{width:'79%'}}></i><em>30</em></div>
          <div><span>Sales</span><i style={{width:'58%'}}></i><em>22</em></div>
          <div><span>Engineering</span><i style={{width:'47%'}}></i><em>18</em></div>
          <div><span>Finance</span><i style={{width:'32%'}}></i><em>12</em></div>
          <div><span>Marketing</span><i style={{width:'26%'}}></i><em>10</em></div>
          <div><span>People</span><i style={{width:'21%'}}></i><em>8</em></div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-t">Employment type</div>
        <div className="donut">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--leaf)" strokeWidth="16" strokeDasharray="152 99.3" transform="rotate(-90 50 50)" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--amber)" strokeWidth="16" strokeDasharray="37 214.3" strokeDashoffset="-153.6" transform="rotate(-90 50 50)" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--coral)" strokeWidth="16" strokeDasharray="33.4 217.9" strokeDashoffset="-192" transform="rotate(-90 50 50)" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--blue)" strokeWidth="16" strokeDasharray="23 228.3" strokeDashoffset="-226.9" transform="rotate(-90 50 50)" />
          </svg>
          <ul>
            <li><i style={{background:'var(--leaf)'}}></i>Full-time 88</li>
            <li><i style={{background:'var(--amber)'}}></i>Contract 22</li>
            <li><i style={{background:'var(--coral)'}}></i>Part-time 20</li>
            <li><i style={{background:'var(--blue)'}}></i>Interns 14</li>
          </ul>
        </div>
      </div>
      <div className="panel">
        <div className="panel-t">Out this week</div>
        <div className="out">
          <div><div className="av" style={{background:'#3B82C4'}}>CV</div><div className="meta">Chisom Victor<span>Back Mon, 5 Oct</span></div><span className="tag tag-coral">Sick</span></div>
          <div><div className="av" style={{background:'#C98A22'}}>AI</div><div className="meta">Amina Ismaila<span>Back Wed, 7 Oct</span></div><span className="tag tag-green">Annual</span></div>
          <div><div className="av" style={{background:'#EE5B47'}}>TJ</div><div className="meta">Temiloluwa Joyce<span>Back 2 Nov</span></div><span className="tag tag-amber">Parental</span></div>
        </div>
      </div>
      <div className="panel wide">
        <div className="panel-t">Monthly salary cost <span>September</span></div>
        <div className="cost">
          <div><b>₦61.2m</b><span>Gross pay</span></div>
          <div><b>₦425k</b><span>Average per employee</span></div>
          <div><b>50%</b><span>Earn ₦150k to ₦300k</span></div>
          <div><b>18</b><span>In the top band</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= PILLAR 2: OPERATIONS TABS ================= */}
<section className="sec grp-start">
  <div className="wrap">
    <div className="sec-head">
      <h2>Attendance to payroll, without the chase.</h2>
      <p>Clock-ins feed attendance, requests land in one queue, and payroll works from the same records. Try the approvals below.</p>
    </div>
    <div className="ops">
      <div className="tabs" role="tablist" aria-label="HR operations">
        <button role="tab" id="t-att" aria-controls="p-att" aria-selected="true"><svg className="icon"><use href="#i-clock" /></svg>Attendance</button>
        <button role="tab" id="t-leave" aria-controls="p-leave" aria-selected="false" tabIndex={-1}><svg className="icon"><use href="#i-cal" /></svg>Leave approvals</button>
        <button role="tab" id="t-pay" aria-controls="p-pay" aria-selected="false" tabIndex={-1}><svg className="icon"><use href="#i-wallet" /></svg>Payroll <span className="tag tag-amber">Rolling out</span></button>
      </div>

      <div className="tabpane on" id="p-att" role="tabpanel" aria-labelledby="t-att">
        <div className="pane-top"><p>Every clock-in is time-stamped, so lateness and overtime are facts, not arguments.</p><span className="tag tag-green">112 in, 7 late, 9 on leave</span></div>
        <div className="tbl-wrap"><table className="tbl">
          <thead><tr><th>Employee</th><th>Department</th><th>Clock in</th><th>Clock out</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td><div className="person"><div className="av" style={{background:'#3E8E7B'}}>JO</div>John Ogeleye</div></td><td>Marketing</td><td className="num">7:56 AM</td><td className="num">5:04 PM</td><td><span className="tag tag-green">On time</span></td></tr>
            <tr><td><div className="person"><div className="av" style={{background:'#3B82C4'}}>IA</div>Iyabo Adeniji</div></td><td>Engineering</td><td className="num">8:31 AM</td><td className="num">Still in</td><td><span className="tag tag-amber">Late</span></td></tr>
            <tr><td><div className="person"><div className="av" style={{background:'#C98A22'}}>JO</div>James Ogunjobi</div></td><td>Customer care</td><td className="num">7:48 AM</td><td className="num">7:15 PM</td><td><span className="tag tag-blue">Overtime</span></td></tr>
            <tr><td><div className="person"><div className="av" style={{background:'#EE5B47'}}>DA</div>Dauda Aliyu</div></td><td>Operations</td><td className="num">Not in</td><td className="num">Not in</td><td><span className="tag tag-coral">Absent</span></td></tr>
          </tbody>
        </table></div>
      </div>

      <div className="tabpane" id="p-leave" role="tabpanel" aria-labelledby="t-leave" hidden>
        <div className="pane-top"><p>Each request shows the balance left and who else is out, so you can decide in one look.</p><span className="tag tag-grey" id="leaveLeft">3 waiting</span></div>
        <div className="tbl-wrap"><table className="tbl">
          <thead><tr><th>Employee</th><th>Type</th><th>Dates</th><th>Balance after</th><th>Decision</th></tr></thead>
          <tbody>
            <tr><td><div className="person"><div className="av" style={{background:'#3B82C4'}}>CO</div>Chidi Okafor</div></td><td>Annual</td><td className="num">14 to 16 Oct</td><td className="num">9 days</td><td><div className="act"><button className="yes">Approve</button><button className="no">Decline</button></div></td></tr>
            <tr><td><div className="person"><div className="av" style={{background:'#C98A22'}}>AE</div>Amara Eze</div></td><td>Sick</td><td className="num">29 Sep</td><td className="num">6 of 10</td><td><div className="act"><button className="yes">Approve</button><button className="no">Decline</button></div></td></tr>
            <tr><td><div className="person"><div className="av" style={{background:'#EE5B47'}}>TA</div>Tolu Adeyemi</div></td><td>Parental</td><td className="num">5 to 19 Oct</td><td className="num">Statutory</td><td><div className="act"><button className="yes">Approve</button><button className="no">Decline</button></div></td></tr>
          </tbody>
        </table></div>
      </div>

      <div className="tabpane" id="p-pay" role="tabpanel" aria-labelledby="t-pay" hidden>
        <div className="pane-top"><p>Payroll draws on the employee and attendance records you already keep in GoxHR, and every employee gets their payslip in the app.</p></div>
        <div className="payrun">
          <div><b>144</b><span>Employees in this run</span></div>
          <div><b>₦61.2m</b><span>Gross pay</span></div>
          <div><b>₦9.8m</b><span>Deductions</span></div>
          <div><b>₦51.4m</b><span>Net pay</span></div>
        </div>
        <div className="payrun-note"><svg className="icon"><use href="#i-clock" /></svg>Payroll is rolling out now. Ask about timelines for your company on your demo call.</div>
      </div>
    </div>
  </div>
</section>

{/* ================= RECORDS + HIRING ================= */}
<section className="sec grp-end">
  <div className="wrap">
    <div className="duo">
      <div className="card">
        <h3>Every employee record, complete</h3>
        <p>Bio data, next of kin, bank details, qualifications and experience in one profile. GoxHR shows you what's missing, and employees fill it in themselves.</p>
        <div className="shot">
          <div className="profile"><div className="ph">JO</div><div><b>James Ojeleye</b><span>Supervisor, Marketing</span></div></div>
          <div className="complete">Profile 84% complete<div className="track"><i></i></div></div>
          <div className="fields">
            <div><span>Started</span><b>12 Jan 2023</b></div>
            <div><span>Reports to</span><b>Johnson Ibikunle</b></div>
            <div><span>Next of kin</span><b>Jude Ojeleye</b></div>
            <div><span>Missing</span><b>NYSC certificate</b></div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3>Hiring, from applicant to first day</h3>
        <p>Post a role, review applicants and move them through each stage. When you hire, their record is already started.</p>
        <div className="shot">
          <div className="pipe">
            <div><span>Applied</span><b>112</b></div>
            <div className="cur"><span>Shortlisted</span><b>12</b></div>
            <div><span>Interview</span><b>5</b></div>
            <div><span>Hired</span><b>1</b></div>
          </div>
          <div className="apps">
            <div><div className="av" style={{background:'#3E8E7B'}}>JO</div><b>James Ogeleye</b><span className="tag tag-green">Shortlisted</span></div>
            <div><div className="av" style={{background:'#3B82C4'}}>IA</div><b>Imoleye Akande</b><span className="tag tag-green">Shortlisted</span></div>
            <div><div className="av" style={{background:'#C98A22'}}>JM</div><b>John Makinde</b><span className="tag tag-blue">Interview</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= PILLAR 3: EMPLOYEES ================= */}
<section className="sec grp-start" id="employees">
  <div className="wrap">
    <div className="band">
      <div className="band-grid">
        <div>
          <div className="sec-head" style={{marginBottom:'32px'}}>
            <span className="kicker">What your employees get</span>
            <h2>Hand routine HR back to your people.</h2>
            <p>Employees apply for leave, check payslips and raise requests themselves. Your inbox gets quieter, and approvals move faster.</p>
          </div>
          <ul className="selfserve">
            <li><button className="ss" type="button" data-go="home" aria-pressed="true"><svg className="icon"><use href="#i-clock" /></svg><div><b>Clock in from their phone</b><span>Attendance you can trust, without a register at the door.</span></div></button></li>
            <li><button className="ss" type="button" data-go="leave" aria-pressed="false"><svg className="icon"><use href="#i-cal" /></svg><div><b>Leave in a few taps</b><span>They see their balance and who's out before they apply.</span></div></button></li>
            <li><button className="ss" type="button" data-go="payroll" aria-pressed="false"><svg className="icon"><use href="#i-wallet" /></svg><div><b>Payslips on demand <span className="ss-pill">Rolling out</span></b><span>Every month's pay, with the breakdown, without emailing HR.</span></div></button></li>
            <li><button className="ss" type="button" data-go="requests" aria-pressed="false"><svg className="icon"><use href="#i-ticket" /></svg><div><b>Requests that reach the right person</b><span>IT support, documents, policy questions and general HR.</span></div></button></li>
          </ul>
          <div className="stores">
            <span className="store"><svg className="icon" style={{fill:'currentColor',stroke:'none'}}><use href="#i-apple" /></svg><span><small>Coming soon to</small>App Store</span></span>
            <span className="store"><svg className="icon"><use href="#i-play" /></svg><span><small>Coming soon to</small>Google Play</span></span>
            <span className="soon">Available on the web today.</span>
          </div>
        </div>

        <div className="app-demo">
          <div className="app-phone" role="group" aria-label="GoxHR mobile app preview">
            <div className="app-scr">
              <img className="app-img on" data-screen="home" src="/app/home.jpg" alt="Home screen with the clock-in card, leave balance, next payday, pending requests and quick actions" width="300" height="652" />
              <img className="app-img" data-screen="leave" src="/app/leave.jpg" alt="Leave screen with annual, sick and casual leave balances, who is out this week and the employee's own requests" aria-hidden="true" width="300" height="652" />
              <img className="app-img" data-screen="payroll" src="/app/payroll.jpg" alt="Payroll screen with September net pay, gross pay, deductions and past payslips" aria-hidden="true" width="300" height="652" />
              <img className="app-img" data-screen="requests" src="/app/requests.jpg" alt="Requests screen with open, in progress and resolved requests, plus how to reach the People team" aria-hidden="true" width="300" height="652" />
              <div className="app-home-hot">
                <button className="app-hot" type="button" data-go="leave" style={{left:'5.3%',top:'65.2%',width:'18.7%',height:'10.4%'}} aria-label="Apply leave, opens the Leave screen"></button>
                <button className="app-hot" type="button" data-go="payroll" style={{left:'28.8%',top:'65.2%',width:'18.7%',height:'10.4%'}} aria-label="Payslip, opens the Payroll screen"></button>
                <button className="app-hot" type="button" data-go="requests" style={{left:'52.3%',top:'65.2%',width:'18.7%',height:'10.4%'}} aria-label="Raise request, opens the Requests screen"></button>
              </div>
              <button className="app-hot app-tab" type="button" data-go="home" style={{left:'0',top:'91.1%',width:'20.3%',height:'7%'}} aria-label="Home tab" aria-current="page"></button>
              <button className="app-hot app-tab" type="button" data-go="leave" style={{left:'20.3%',top:'91.1%',width:'18.9%',height:'7%'}} aria-label="Leave tab"></button>
              <button className="app-hot app-tab" type="button" data-go="payroll" style={{left:'39.2%',top:'91.1%',width:'19.5%',height:'7%'}} aria-label="Payroll tab"></button>
              <button className="app-hot app-tab" type="button" data-go="requests" style={{left:'58.7%',top:'91.1%',width:'20.1%',height:'7%'}} aria-label="Requests tab"></button>
            </div>
          </div>
          <p className="app-hint">Tap the tabs to look around the app.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= PERFORMANCE + POLICIES ================= */}
<section className="sec grp-end">
  <div className="wrap">
    <div className="duo">
      <div className="card">
        <h3>Review cycles that actually finish</h3>
        <p>Set goals, open self-assessments and track every review through to a final rating. Employees see their progress; you see who's behind.</p>
        <div className="shot">
          <div className="panel-t" style={{fontSize:'13px'}}>H2 2026 performance review <span>Step 2 of 5</span></div>
          <div className="steps5"><span className="done"></span><span className="now"></span><span></span><span></span><span></span></div>
          <div className="okr">
            <div><div className="top">Grow qualified pipeline by 30%<em>72%</em></div><div className="tr"><i style={{width:'72%'}}></i></div></div>
            <div><div className="top">Cut response time below 2 hours<em>90%</em></div><div className="tr"><i style={{width:'90%'}}></i></div></div>
            <div><div className="top">Complete CRM certification<em>45%</em></div><div className="tr"><i style={{width:'45%'}}></i></div></div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3>Policies people have actually read</h3>
        <p>Publish a policy once and GoxHR tracks who has acknowledged it, so you have a record when it matters.</p>
        <div className="shot">
          <div className="policies">
            <div><svg className="icon"><use href="#i-doc" /></svg><b>Remote work policy</b><span className="tag tag-amber">118 of 144</span></div>
            <div><svg className="icon"><use href="#i-doc" /></svg><b>Leave and time-off policy</b><span className="tag tag-green">All read</span></div>
            <div><svg className="icon"><use href="#i-doc" /></svg><b>Information security policy</b><span className="tag tag-green">All read</span></div>
            <div><svg className="icon"><use href="#i-doc" /></svg><b>Code of conduct</b><span className="tag tag-green">All read</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= HOW IT WORKS ================= */}
<section className="sec">
  <div className="wrap setup">
    <div className="setup-copy">
      <div className="sec-head" style={{marginBottom:'28px'}}>
        <h2>Up and running in three steps.</h2>
        <p>Our team walks you through each step, so you can start without an IT project.</p>
      </div>
      <a className="btn btn-primary" href={DEMO_URL} target="_blank" rel="noopener noreferrer">Book a demo</a>
      <ol className="setup-list">
        <li className="setup-item on">
          <button className="setup-btn" type="button" aria-expanded="true" aria-controls="setup-d1"><span className="n">01.</span><span className="t">Import your people</span></button>
          <div className="setup-desc" id="setup-d1"><div><p>Upload your employee list from a spreadsheet, or add people one at a time.</p></div></div>
          <span className="setup-prog" aria-hidden="true"></span>
        </li>
        <li className="setup-item">
          <button className="setup-btn" type="button" aria-expanded="false" aria-controls="setup-d2"><span className="n">02.</span><span className="t">Invite your team</span></button>
          <div className="setup-desc" id="setup-d2"><div><p>Everyone gets an email invite to set a password and sign in on web.</p></div></div>
          <span className="setup-prog" aria-hidden="true"></span>
        </li>
        <li className="setup-item">
          <button className="setup-btn" type="button" aria-expanded="false" aria-controls="setup-d3"><span className="n">03.</span><span className="t">Run HR from your dashboard</span></button>
          <div className="setup-desc" id="setup-d3"><div><p>Attendance, leave and requests start flowing in the same day.</p></div></div>
          <span className="setup-prog" aria-hidden="true"></span>
        </li>
      </ol>
    </div>
    <div className="setup-stage">
      <div className="routine" aria-label="What happens in this step">
        <div className="routine-set">
          <p className="routine-cap"><span className="cap-state">Running</span> <b>&ldquo;Import your people&rdquo;</b></p>
          <ul className="routine-rows">
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-upload" /></svg></span><span>Uploaded <em>employees.xlsx</em></span></li>
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-users" /></svg></span><span>Created <em>144 employee profiles</em> across 7 departments</span></li>
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-doc" /></svg></span><span>Found <em>6 profiles</em> missing a next of kin</span></li>
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-mail" /></svg></span><span>Asked those 6 people to fill in the gaps</span></li>
          </ul>
        </div>
        <div className="routine-set" hidden>
          <p className="routine-cap"><span className="cap-state">Running</span> <b>&ldquo;Invite your team&rdquo;</b></p>
          <ul className="routine-rows">
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-mail" /></svg></span><span>Emailed invites to <em>144 people</em></span></li>
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-check" /></svg></span><span><em>chidi@company.ng</em> set a password and signed in</span></li>
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-check" /></svg></span><span><em>amara@company.ng</em> signed in on web</span></li>
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-shield" /></svg></span><span>Turned on <em>two-factor sign-in</em> for admins</span></li>
          </ul>
        </div>
        <div className="routine-set" hidden>
          <p className="routine-cap"><span className="cap-state">Running</span> <b>&ldquo;Run HR from your dashboard&rdquo;</b></p>
          <ul className="routine-rows">
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-clock" /></svg></span><span><em>112 people</em> clocked in today</span></li>
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-cal" /></svg></span><span><em>3 leave requests</em> are waiting for your approval</span></li>
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-ticket" /></svg></span><span>New IT support request from <em>Iyabo Adeniji</em></span></li>
            <li className="rrow"><span className="ic"><svg className="icon"><use href="#i-cal" /></svg></span><span>Independence Day, <em>Thu 1 Oct</em>, is on everyone's calendar</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= SECURITY ================= */}
<section className="sec secure-sec">
  <div className="wrap">
    <div className="sec-head">
      <h2>Your people's data, locked down.</h2>
      <p>HR holds your most sensitive records. GoxHR controls who can see and change them.</p>
    </div>
    <div className="secure">
      <div><div className="secure-top"><span className="secure-ic"><svg className="icon"><use href="#i-lock" /></svg></span><span className="secure-n" aria-hidden="true">01</span></div><h3>Two-factor sign-in</h3><p>Every account can require a second step at sign-in, so a stolen password isn't enough.</p></div>
      <div><div className="secure-top"><span className="secure-ic"><svg className="icon"><use href="#i-role" /></svg></span><span className="secure-n" aria-hidden="true">02</span></div><h3>Role-based access</h3><p>Create roles like HR admin, line manager and finance, and decide exactly what each can view and edit.</p></div>
      <div><div className="secure-top"><span className="secure-ic"><svg className="icon"><use href="#i-shield" /></svg></span><span className="secure-n" aria-hidden="true">03</span></div><h3>A record of what's been agreed</h3><p>Policy acknowledgements are logged per employee, so you can show who accepted what, and when.</p></div>
    </div>
  </div>
</section>

{/* ================= PRICING ================= */}
<section className="sec" id="sales">
  <div className="wrap pricing">
    <div className="pricing-copy">
      <h2>Pricing that fits your team.</h2>
      <p>Every company runs HR differently, so we price around your headcount and the modules you need. Talk to our team for a quote.</p>
      <a className="btn btn-primary" href="#demo">Talk to sales</a>
    </div>
    <div className="price-cards">
      <div className="price-card"><span className="price-ic"><svg className="icon"><use href="#i-users" /></svg></span><div><b>Growing teams</b><span>Move off spreadsheets and group chats before they break.</span></div></div>
      <div className="price-card"><span className="price-ic"><svg className="icon"><use href="#i-building" /></svg></span><div><b>Mid-sized companies</b><span>Give managers approvals and give HR one clean record.</span></div></div>
      <div className="price-card"><span className="price-ic"><svg className="icon"><use href="#i-grid" /></svg></span><div><b>Large and multi-branch organisations</b><span>Roles and access that match your structure.</span></div></div>
    </div>
  </div>
</section>

{/* ================= FAQ ================= */}
<section className="sec" id="faq">
  <div className="wrap faq-wrap">
    <h2>Frequently asked questions.</h2>
    <div>
      <div className="faq">
        <details><summary><span className="faq-n">01.</span><span className="faq-q">Who is GoxHR for?</span></summary><p>Companies of every size that want HR in one place, from teams leaving spreadsheets behind to large organisations with several branches. HR admins run everything from the dashboard, and employees use the self-service app.</p></details>
        <details><summary><span className="faq-n">02.</span><span className="faq-q">How do we get started?</span></summary><p><a href={DEMO_URL} target="_blank" rel="noopener noreferrer">Book a demo</a> and we'll walk you through GoxHR with your own setup in mind. After that, you import your employees, invite them by email, and you're running.</p></details>
        <details><summary><span className="faq-n">03.</span><span className="faq-q">Does GoxHR run payroll?</span></summary><p>Payroll is rolling out now and works from the employee and attendance records you already keep in GoxHR. Ask about timelines for your company on your demo call.</p></details>
        <details><summary><span className="faq-n">04.</span><span className="faq-q">Is there a mobile app?</span></summary><p>Employees can use GoxHR on the web today. Our iOS and Android apps are in testing and coming soon.</p></details>
        <details><summary><span className="faq-n">05.</span><span className="faq-q">How is our data protected?</span></summary><p>Accounts support two-factor sign-in, and role-based access lets you decide exactly who can view or edit each part of an employee's record.</p></details>
        <details><summary><span className="faq-n">06.</span><span className="faq-q">How much does it cost?</span></summary><p>Pricing depends on your headcount and the modules you need. Talk to our sales team and we'll send a quote.</p></details>
      </div>
      <p className="faq-more">Can't find your answer here? <a href="#demo">Get in touch.</a></p>
    </div>
  </div>
</section>

{/* ================= FINAL CTA / DEMO ================= */}
<section className="sec" id="demo">
  <div className="wrap">
    <div className="final">
      <svg className="rings" viewBox="0 0 206.6 210.59" aria-hidden="true"><use href="#goxhr-mark-mono" /></svg>
      <div>
        <h2>See your workforce in one place.</h2>
        <p className="lead">Book a demo and we'll walk you through GoxHR with your team's size and setup in mind, and answer every question on the call.</p>
      </div>
      <div className="form">
        <a className="btn btn-primary" href={DEMO_URL} target="_blank" rel="noopener noreferrer">Book a demo</a>
        <p className="fine">No commitment. Pick a 30-minute time that works for you.</p>
      </div>
    </div>
  </div>
</section>
</main>


<footer>
  <div className="wrap">
    <div className="foot">
      <div>
        <a className="logo" href="#top" aria-label="GoxHR home" style={{padding:'0'}}>
          <svg className="brand" viewBox="0 0 930.76 210.59" aria-hidden="true">
            <use href="#goxhr-logo" />
          </svg>
        </a>
        <p style={{marginTop:'12px',maxWidth:'300px'}}>
          HR software for companies that want their people, attendance, leave and payroll in one place.
        </p>
        <div style={{marginTop:'18px',fontSize:'14px',lineHeight:1.7,opacity:0.85}}>
          <b style={{display:'block',marginBottom:'6px',opacity:1}}>Contact</b>
          <a href="mailto:info@goxsuite.com">info@goxsuite.com</a>
          <a href="tel:+2349018426160">+234 901 842 6160</a>
        </div>
      </div>

      <div>
        <h4>Product</h4>
        <a href="#hr">Dashboard</a>
        <a href="#hr">Attendance</a>
        <a href="#hr">Leave</a>
        <a href="#hr">Payroll</a>
        <a href="#employees">Employee app</a>
      </div>

      <div>
        <h4>Company</h4>
        <a href="#" data-stub="About page to come.">About</a>
        <a href="#" data-stub="Careers page to come.">Careers</a>
        <a href="#demo">Contact sales</a>
      </div>

      <div>
        <h4>Legal</h4>
        <Link href="https://policy.goxsuite.com/">Privacy policy</Link>
        <Link href="/terms">Terms of service</Link>
      </div>
    </div>

    {/* Corporate Information */}
    <div style={{
      borderTop:'1px solid rgba(128,128,128,0.25)',
      marginTop:'32px',
      padding:'26px 24px',
      background:'rgba(128,128,128,0.05)',
      borderRadius:'10px'
    }}>
      <div style={{marginBottom:'20px'}}>
        <h4 style={{fontSize:'14px',fontWeight:'700',margin:'0 0 5px'}}>
          Corporate Information
        </h4>
        <p style={{fontSize:'12px',opacity:0.65,margin:0}}>
          Company ownership and registered business details.
        </p>
      </div>

      <div style={{
        display:'grid',
        gridTemplateColumns:'1fr 1fr',
        gap:'24px'
      }}>
        <div>
          <span style={{
            display:'block',
            fontSize:'10px',
            fontWeight:'700',
            letterSpacing:'1px',
            opacity:0.6,
            marginBottom:'8px'
          }}>
            COMPANY OWNERSHIP
          </span>
          <p style={{fontSize:'13px',lineHeight:1.8,margin:0,opacity:0.85}}>
            GoxHR is a wholly owned subsidiary of <b>Lulitech Limited</b>, a company registered in Nigeria.
          </p>
        </div>

        <div>
          <span style={{
            display:'block',
            fontSize:'10px',
            fontWeight:'700',
            letterSpacing:'1px',
            opacity:0.6,
            marginBottom:'8px'
          }}>
            REGISTERED OFFICE
          </span>
          <p style={{fontSize:'13px',lineHeight:1.8,margin:0,opacity:0.85}}>
            17, Tokunbo street, lagoon view estate, Makoko, Yaba, Lagos State, Nigeria.
          </p>
        </div>
      </div>

      <div style={{
        borderTop:'1px solid rgba(128,128,128,0.2)',
        marginTop:'20px',
        paddingTop:'15px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap',
        gap:'10px',
        fontSize:'11px',
        lineHeight:1.7,
        opacity:0.7
      }}>
        <span>Company Registration Number: RC 9243944</span>
        <span>Payments and services on this website are provided by GoxHR.</span>
      </div>
    </div>

    <div className="legal">
      <span>© 2026 GoxHR. All rights reserved.</span>
      <span>Made for teams in Nigeria and beyond.</span>
    </div>
  </div>
</footer>

{getStartedOpen && <GetStartedModal onClose={() => setGetStartedOpen(false)} />}
    </>
  );
}
