import { useState } from "react";

export function RadioTogglers({ defaultValue, options, onChange }) {
	const [active, setActive] = useState(false);

	function handleClick(e) {
		onChange(e.target.value);
		setActive(e.target.value === "color");
	}

	return (
		<div className="radio-togglers">
			{options.map((option, index) => (
				<label key={index}>
					<input
						type="radio"
						name="bgType"
						value={option.value}
						defaultChecked={defaultValue === option.value}
						onClick={handleClick}
					/>
					<span className="flex cursor-pointer items-center gap-x-2">
						{option.icon}
						{option.label}
					</span>
				</label>
			))}
		</div>
	);
}
