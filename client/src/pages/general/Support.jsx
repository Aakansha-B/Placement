import React from "react";

export default function Support() {
  return (
    <div className="row g-3">
      <div className="col-12 col-lg-8">
        <div className="card pp-card pp-shadow">
          <div className="card-body">
            <h2 className="h5 mb-3">Help & Support</h2>
            <p className="text-muted">
              Need help? Check FAQs or contact the TPO/Admin team.
            </p>

            <div className="mb-3">
              <h6 className="mb-2">FAQs</h6>
              <ul className="mb-0">
                <li>How do I apply to a job?</li>
                <li>How do I see my test results?</li>
                <li>How do I reschedule an interview?</li>
              </ul>
            </div>

            <div className="mt-3">
              <h6 className="mb-2">Contact</h6>
              <div className="text-muted">Email: tpo@college.edu</div>
              <div className="text-muted">Phone: +91-98765-43210</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
