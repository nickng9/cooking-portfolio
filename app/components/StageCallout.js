export default function StageCallout() {
  const goals = [
    "Learn high-volume plating techniques",
    "Master advanced pastry methods",
    "Understand kitchen flow and brigade roles",
  ];
  return (
    <section
      className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-12"
      role="region"
      aria-labelledby="stage-heading"
    >
      <h3 id="stage-heading" className="text-2xl font-semibold mb-2">
        Why I Want to Stage
      </h3>
      <ul className="list-disc list-inside space-y-1">
        {goals.map((goal, i) => (
          <li key={i} className="text-gray-800">
            {goal}
          </li>
        ))}
      </ul>
    </section>
  );
}
