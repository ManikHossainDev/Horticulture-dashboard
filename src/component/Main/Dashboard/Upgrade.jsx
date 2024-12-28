
const Upgrade = () => {
  const items = [
    {
      id: 1,
      icon: "📦",
      week: "From Last Week",
      alluser: "1000+",
    },
    {
      id: 2,
      icon: "🔧",
      title: "Total Views Received",
      desc: "Excepteur sint occaecat cupidatat non proident su sknt.",
      week: "From Last Week",
      alluser: "1000+",
    },
    {
      id: 3,
      icon: "🖥️",
      title: "Total Call Received",
      desc: "Write and test software to ensure seamless product functionality.",
      week: "From Last Week",
      alluser: "1480+",
    },
    {
      id: 4,
      icon: "📊",
      title: "Total Users",
      desc: "Analyze product performance and identify areas for improvement.",
      week: "From Last Week",
      alluser: "1170+",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 py-5">
        {items.map((item, index) => (
          <div key={item.id} className="p-4  rounded-lg shadow">
            <div className="mb-4">
              <span className="text-4xl">{item.icon}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.desc}</p>
            <div className="flex justify-between mt-4 text-sm">
              <span className="bg-[#E9EAEA] p-2 rounded-lg">{item.week}</span>

              {/* Conditional styling for item.alluser based on index */}
              <span
                className={
                  index % 2 === 0
                    ? "text-blue-300 text-3xl"
                    : "text-green-500 text-3xl"
                }
              >
                {item.alluser}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
