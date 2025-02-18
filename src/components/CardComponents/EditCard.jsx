import { React, useState } from 'react'

export const EditCard = ({ card, formerText, handleUpdateContent, handleEdit }) => {
    const [text, setText] = useState(formerText);

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
                    placeholder={formerText}
                ></textarea>
                <div className="text-center">
                    <button
                        className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                        title="Edit Card"
                        onClick={() => {
                            handleUpdateContent(card.$id, text)
                            handleEdit();
                        }}
                    >Save Changes</button>
                </div>
            </div>
        </div>
    );
};
