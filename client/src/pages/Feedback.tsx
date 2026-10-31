
export default function Feedback() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert("Thank you! Your feedback has been submitted.");
  }

  return (
    <section aria-labelledby="feedback-heading">
      <p className="eyebrow">USER FEEDBACK</p>

      <h2 id="feedback-heading">Accessibility Feedback Form</h2>

      <p className="muted">
        Use this form to report accessibility issues or suggest improvements.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Enter your email address"
          />
        </div>

        <fieldset>
          <legend>What type of issue did you identify?</legend>

          <div className="form-group">
            <input
              type="radio"
              id="contrast"
              name="issueType"
              value="Colour contrast"
              required
            />
            <label htmlFor="contrast">Colour contrast</label>
          </div>

          <div className="form-group">
            <input
              type="radio"
              id="keyboard"
              name="issueType"
              value="Keyboard navigation"
            />
            <label htmlFor="keyboard">Keyboard navigation</label>
          </div>

          <div className="form-group">
            <input
              type="radio"
              id="screen-reader"
              name="issueType"
              value="Screen reader"
            />
            <label htmlFor="screen-reader">Screen reader compatibility</label>
          </div>
        </fieldset>

        <div className="form-group">
          <label htmlFor="message">Describe the issue</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={10}
            placeholder="Describe the accessibility issue..."
          />
        </div>

        <button type="submit">Submit Feedback</button>
      </form>
    </section>
  );
}
