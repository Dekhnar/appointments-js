/**
 * (6) missing error display
 */
// function Employee({ id }) {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [employee, setEmployee] = useState({});

//   useEffect(() => {
//     getEmployee(id)
//       .then((employee) => {
//         setEmployee(employee);
//         setLoading(false);
//       })
//       .catch((_) => {
//         setError('Unable to fetch employee');
//         setLoading(false);
//       });
//   }, [id]);

//   if (error) {
//     return <Error />;
//   }

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <Table>
//       <Row>
//         <Cell>{employee.firstName}</Cell>
//         <Cell>{employee.lastName}</Cell>
//         <Cell>{employee.position}</Cell>
//         <Cell>{employee.project}</Cell>
//         <Cell>{employee.salary}</Cell>
//         <Cell>{employee.yearHired}</Cell>
//         <Cell>{employee.wololo}</Cell>
//       </Row>
//     </Table>
//   );
// }

// my implementation
// function Employee({ id }) {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [employee, setEmployee] = useState({});

//   useEffect(() => {
//     getEmployee(id)
//       .then((employee) => {
//         setEmployee(employee);
//         setLoading(false);
//       })
//       .catch((_) => {
//         setError('Unable to fetch employee');
//         setLoading(false);
//       });
//   }, [id]);

//   if (error) {
//     return <Error error={error} />;
//   }

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <Table>
//       <Row>
//         <Cell>{employee.firstName}</Cell>
//         <Cell>{employee.lastName}</Cell>
//         <Cell>{employee.position}</Cell>
//         <Cell>{employee.project}</Cell>
//         <Cell>{employee.salary}</Cell>
//         <Cell>{employee.yearHired}</Cell>
//         <Cell>{employee.wololo}</Cell>
//       </Row>
//     </Table>
//   );
// }
