export function RadioTogglers({ defaultValue, options }) {
	return (
		<div className="radio-togglers">
			{options.map((option, index) => (
				<label key={index}>
					<input
						type="radio"
						name="bgType"
						value={option.value}
						defaultChecked={defaultValue === option.value}
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
