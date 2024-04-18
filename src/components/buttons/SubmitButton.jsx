import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";

export function SubmitButton({ children }) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="flex w-full items-center justify-center gap-x-1 rounded-md bg-[#F7961E] px-3 py-2 text-xl font-medium disabled:bg-orange-300"
		>
			{pending ? (
				<>
					Loading
					<Loader size={25} className="animate-spin" />
				</>
			) : (
				children
			)}
		</button>
	);
}
