
import { useRef } from "react";

export default function AuditModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button type="button" onClick={openDialog}>
        View Audit Details
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="dialog-heading"
        className="audit-dialog"
      >
        <h2 id="dialog-heading">Accessibility Audit Details</h2>

        <p>
          The recorded Lighthouse accessibility score is 81 out of 100.
        </p>

        <p>
          Five groups of accessibility issues were identified for further
          investigation and improvement.
        </p>

        <button type="button" onClick={closeDialog}>
          Close Dialog
        </button>
      </dialog>
    </>
  );
}
