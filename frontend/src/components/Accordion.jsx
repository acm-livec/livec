// Accordion.js
import { useState, useRef, useEffect } from 'react';
import './Accordion.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const AccordionItem = ({ css, title, content, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen ? `fit-content` : '0px');
        }
    }, [isOpen]);

    return (
        <div className={`accordion-item`}>
            <div
                className="flex justify-between accordion-title"
                onClick={onClick}
            >
                {/* {title} {range?.start || -99} - {range?.end || -99} {<FaChevronDown  />} */}
                {title} {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div
                ref={contentRef}
                className={`accordion-content ${isOpen ? 'open' : ''} `}
                style={{ maxHeight }}
            >
                <div>{content}</div>
            </div>
        </div>
    );
};

const Accordion = ({ css, item, content }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            <AccordionItem
                css={css}
                key={item.title}
                title={item.title}
                content={content}
                isOpen={openIndex === item.title}
                onClick={() => handleToggle(item.title)}
            />
        </div>
    );
};

export default Accordion;
