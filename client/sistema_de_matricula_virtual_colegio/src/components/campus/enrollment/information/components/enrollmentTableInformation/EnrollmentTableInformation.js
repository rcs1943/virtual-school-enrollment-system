import CustomDataTable from "../../../../../general/customDataTable/CustomDataTable";

const getData = (data) => ({
	caption: (
		<>
			<span>TUTOR A CARGO:</span> {data.formTeacher}
		</>
	),
	fields: ["N°", "Curso", "Docente"],
	rows: data.courses
});

const EnrollmentTableInformation = ({ tableInformation }) => {
	const data = getData(tableInformation);
	return (
		<CustomDataTable
			rows={data.rows}
			fields={data.fields}
			caption={data.caption}
			width="85%"
		/>
	);
};

export default EnrollmentTableInformation;