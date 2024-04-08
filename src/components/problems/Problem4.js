import {useState} from "react";

// Demonstrates how state can hold many pieces of data.
const Problem4 = () => {
  // @todo wire this form up so we can add reminders in the form
  // that get listed in the other column.
  const [inputText, setInputText] = useState('');
  const [reminders, setReminders] = useState([]);

  const clickHandler = () => {
    setReminders((previousValue) => {
      return [...previousValue, inputText]
    })
    setInputText('');
  }

  return (
    <div className='row'>
      <div className='col col-sm-12 col-lg-4'>
        <label className="form-label">Add a reminder</label>
        <input
          type="text"
          className="form-control"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button 
          className='btn btn-primary'
          onClick={clickHandler}>
            Add Reminder
          </button>
      </div>
      <div className='col col-sm-12 col-lg-8'>
        <ul>
          {reminders.length === 0 && 'no reminders yet'}
          {reminders.length > 0 && reminders.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  )

}

export default Problem4;
