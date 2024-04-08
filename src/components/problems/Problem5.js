import { useState } from "react";
import ReminderList from "../p5/ReminderList";
import ReminderForm from "../p5/ReminderForm";

// @todo use the concepts from problems 1-4 and prior exercises to
// create the form in Problem 4, with the following differences:
// - Cache the reminders in local storage (name it "reminders").
// - You'll need to complete two new components that create the reminder form and reminder list
//   See the commented code in return() for where they should go.
// - All the useState calls should still happen here. (i.e. all state is initialized here, though it may get passed elsewhere)
const Problem5 = () => {
  return (
    <div className="row">
      <div className="col col-sm-12 col-lg-4">
        {/* <ReminderForm SOME PROPS! /> */}
      </div>
      <div className="col col-sm-12 col-lg-8">
        {/* <ReminderList SOME PROPS! /> */}
      </div>
    </div>
  );
};

export default Problem5;
