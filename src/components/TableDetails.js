import React from "react";
import {LoadingText} from "./LoadingText";

export const TableDetails = ({header, tableData}) => {
    return (
        <>
            { header && <h4 className="mt-5">{header}</h4> }
            <table className="table">
                <tbody>
                {
                    tableData.map((row, i) => (
                        <tr key={i}>
                            {
                                row.map(col => (
                                    <td key={`${col.key}-${col.value}`}>
                                        <LoadingText title={col.key} value={col.value} label={col.label} />
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}