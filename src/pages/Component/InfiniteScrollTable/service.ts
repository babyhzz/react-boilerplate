export interface DataType {
  id: {
    name: string;
    value: string;
  };
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

interface DataResult {
  list: DataType[];
}

const pageSize = 20;

export default function service(currentData?: DataResult): Promise<DataResult> {
  const page = currentData ? Math.ceil(currentData.list.length / pageSize) + 1 : 1;
  return new Promise((resolve) => {
    fetch(`https://randomuser.me/api/?page=${page}&results=${pageSize}&seed=123`)
      .then((res) => res.json())
      .then((body) => {
        resolve({
          list: body.results,
        });
      });
  });
}
