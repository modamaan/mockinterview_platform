import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };

  return (
    <div className="border border-gray-300 shadow-md rounded-xl p-6 bg-white hover:shadow-2xl transition-shadow duration-300">
      <h2 className="font-semibold text-2xl text-primary mb-3">
        {question?.jobPosition}
      </h2>
      <p className="text-lg text-gray-700 mb-2">
        {question?.jobExperience} Years of Experience
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Created At: {new Date(question.createdAt).toLocaleDateString()}
      </p>

      <div className="flex justify-end mt-5">
        <Button onClick={onStart} size="lg" className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200">
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;