import { React, useState } from 'react'

export const AddCard = ({ handleCreateCard }) => {
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div>
            <div>
                <textarea
                    id="changeCard"
                    className="text-center mt-2 w-full text-lg rounded-xl border-2 border-gray-400 align-top sm:text-sm p-4"
                    rows="4"
                    value={text}
                    onChange={handleChange}
                    placeholder="An emotionally challenging task that you can do for 2 minutes..."
                ></textarea>
                <button className="mx-auto h-16 w-36 mt-2" onClick={() => handleCreateCard(text, false)} > Save</button>
            </div>
        </div>
    );
};
