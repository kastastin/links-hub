export function RadioTogglers({ options }) {
	return (
		<div className="radio-togglers">
			{options.map((option, index) => (
				<label key={index}>
					<input type="radio" name="bgType" value={option.value} />
					<span className="flex items-center gap-x-2 cursor-pointer">
						{option.icon}
						{option.label}
					</span>
				</label>
			))}
		</div>
	);
}
